//mod prelude;
//use self::prelude::*;
use super::prelude::*;
use super::prelude::otpl::util::VecSliceCompare;
use std::io::{self, Write};

#[derive(Debug)]
pub struct StringWriter {
    output: Vec<u8>,
}

impl StringWriter {
    pub fn new() -> StringWriter {
        StringWriter { output: vec![] }
    }

    pub fn to_str(&mut self) -> String {
        String::from_utf8(self.output.clone()).unwrap()
    }
}

impl Write for StringWriter {
    fn write(&mut self, buf: &[u8]) -> Result<usize, io::Error> {
        let len = buf.len();
        for c in buf {
            self.output.push(*c);
        }
        return Ok(len);
    }
    fn flush(&mut self) -> Result<(), io::Error> {
        Ok(())
    }
}


//pub struct Compilerx<'a>(pub &'a Source, pub &'a mut Write, pub usize, pub bool);//indent
pub struct Compiler<'a> {
    source: &'a Source,
    writer: &'a mut Write,
    indent: usize,
    in_prev_yield: bool,
    in_yield: bool,
    in_for: usize,
}

impl<'a> Compiler<'a> {
    pub fn new(source: &'a Source, writer: &'a mut Write) -> Compiler<'a> {
        return Compiler {
            source: source,
            writer: writer,
            indent: 0,
            in_prev_yield: false,
            in_yield: false,
            in_for: 0,
        }
    }
    fn gen_yield(&mut self) -> VisitResult {
        if self.in_yield {
            return self.write("yield ".as_ref());
        }
        return Ok(());
    }
    fn yield_in(&mut self) {
        self.in_prev_yield = self.in_yield;
        self.in_yield = true;
    }
    fn yield_out(&mut self) {
        self.in_prev_yield = self.in_yield;
        self.in_yield = false;
    }
    fn yield_restore(&mut self) {
        self.in_yield = self.in_prev_yield;
    }
    fn indents_in(&mut self) {
        self.indent += 1;
    }
    fn indents_de(&mut self) {
        self.indent -= 1;
    }
    fn gen_indents(&mut self) -> VisitResult {
        let mut s = String::new();
        for i in 0..self.indent * 4 {
            s += " ";
        }
        return self.write(s.as_ref());
    }
    fn visit_list_format(&mut self, list: &NodeList) -> VisitResult {
        for n in list {
            self.gen_indents();
            self.visit(&n);
            self.write("\n".as_ref())?;
        }
        return Ok(());
    }
    fn write(&mut self, buf: &[u8]) -> VisitResult {
        match self.writer.write(buf) {
            Ok(_) => { return Ok(()); }
            Err(err) => { return Err(otpl::Error::Message(format!("{}", err))); }
        }
    }
    fn for_in(&mut self) {
        self.in_for += 1;
    }
    fn for_out(&mut self) {
        self.in_for -= 1;
    }
    fn is_in_for(&self) -> bool {
        self.in_for == 0
    }
}

impl<'a> Visitor for Compiler<'a> {
    fn visit_root(&mut self, body: &NodeList) -> VisitResult {
        self.write("function* (context) {\n".as_ref())?;
        self.indents_in();
        self.yield_in();
        self.visit_list_format(body)?;
        self.yield_restore();
        self.indents_de();
        self.write("}".as_ref())?;
        return Ok(());
    }
    fn visit_dom_tag(&mut self, name: &Token, attrs: &Vec<ast::DomAttr>, children: &NodeList) -> VisitResult {
        self.gen_yield()?;
        self.write("context.createElement('".as_ref())?;
        self.write(name.value())?;
        self.write("', {".as_ref())?;
        let mut first = false;
        self.yield_out();
        for attr in attrs {
            if !first {
                first = true;
            } else {
                self.write(",".as_ref())?;
            }
            self.write("\"".as_ref())?;
            self.write(attr.name.value())?;
            self.write("\":".as_ref())?;
            self.visit_list(&attr.value)?;
        }
        self.yield_restore();
        self.write("}, (function* () {\n".as_ref())?;
        self.indents_in();
        self.yield_in();
        self.visit_list_format(children)?;
        self.yield_restore();
        self.indents_de();
        self.gen_indents()?;
        self.write("})())".as_ref())?;
        return Ok(());
    }

    fn visit_literal(&mut self, tok: &Token) -> VisitResult {
        self.gen_yield()?;
        self.write("`".as_ref())?;
        self.write(tok.value())?;
        self.write("`".as_ref())?;
        return Ok(());
    }
    fn visit_ternary(&mut self, expr: &Node, left: &Node, right: &Node) -> VisitResult {
        self.write("context.toBool(".as_ref())?;
        self.visit(expr)?;
        self.write(") ? ".as_ref())?;
        self.visit(left)?;
        self.write(" : ".as_ref())?;
        return self.visit(right);
    }

    fn visit_binary(&mut self, left: &Node, right: &Node, operator: &Operator) -> VisitResult {
        match operator {
            &Operator::NullCond => {
                self.write("context.nullValue(".as_ref())?;
                self.visit(left)?;
                self.write(", ".as_ref())?;
                self.visit(right)?;
                return self.write(")".as_ref());
            }
            &Operator::TestCond => {
                self.write("context.trueValue(".as_ref())?;
                self.visit(left)?;
                self.write(", ".as_ref())?;
                self.visit(right)?;
                return self.write(")".as_ref());
            }
            _ => {}
        }

        self.visit(left)?;
        let str = match operator {
            &Operator::Add => "+",
            &Operator::Sub => "-",
            &Operator::Mul => "*",
            &Operator::Div => "/",
            &Operator::Mod => "%",
            &Operator::And => "&&",
            &Operator::Or => "||",
            &Operator::Eq => "==",
            &Operator::NotEq => "!=",
            &Operator::Lt => "<",
            &Operator::Lte => "<=",
            &Operator::Gt => ">",
            &Operator::Gte => ">=",
            _ => unreachable!(),
        };
        self.write(str.as_ref())?;
        return self.visit(right);
    }

    fn visit_unary(&mut self, body: &Node, operator: &Operator) -> VisitResult {
        match operator {
            &Operator::Not => {
                self.write("!".as_ref())?;
            }
            &Operator::Sub => {
                self.write("-".as_ref())?;
            }
            &Operator::Add => {
                self.write("+".as_ref())?;
            }
            _ => { unreachable!(); }
        }
        return self.visit(body);
    }

    fn visit_property(&mut self, obj: &Node, params: &NodeList, operator: &Token) -> VisitResult {
        if !params.is_empty() {
            self.write("context.get(".as_ref())?;
            self.visit(&params[0])?;
            match obj {
                &Node::Empty => {}
                _ => {
                    self.write(", ".as_ref())?;
                    self.visit(obj)?;
                }
            }
            self.write(")".as_ref())?;
        }
        return Ok(());
    }

    fn visit_method(&mut self, obj: &Node, params: &NodeList, operator: &Token) -> VisitResult {
        self.write("visit_method".as_ref())
    }

    fn visit_const(&mut self, c: &Constant) -> VisitResult {
        match c {
            &Constant::None => {
                self.write("null".as_ref())?;
            }
            &Constant::Break(ref tok) => {
                if !self.is_in_for() {
                    return Err(otpl::Error::Visit(format!("break keyword must be in for statement"), tok.offset()));
                }
                self.write("break\n".as_ref())?;
            }
            &Constant::Continue(ref tok) => {
                if !self.is_in_for() {
                    return Err(otpl::Error::Visit(format!("continue keyword must be in for statement"), tok.offset()));
                }
                self.write("continue\n".as_ref())?;
            }
            &Constant::True => {
                self.write("true".as_ref())?;
            }
            &Constant::False => {
                self.write("false".as_ref())?;
            }
            &Constant::String(ref tok) => {
                self.write("`".as_ref())?;
                self.write(tok.value())?;
                self.write("`".as_ref())?;
            }
            &Constant::Float(ref i, ref d) => {
                self.write(i.value())?;
                self.write(".".as_ref())?;
                self.write(d.value())?;
            }
            &Constant::Integer(ref i) => {
                self.write(i.value())?;
            }
            _ => unreachable!()
        }
        return Ok(());
    }

    fn visit_identifier(&mut self, tok: &Token) -> VisitResult {
        self.write("context.get('".as_ref())?;
        self.write(tok.value())?;
        return self.write("')".as_ref());
    }

    fn visit_if(&mut self, condition: &Node, body: &NodeList, branches: &NodeList, is_else_if: &bool) -> VisitResult {
        if *is_else_if {
            self.write("else if".as_ref())?;
        } else {
            self.write("if".as_ref())?;
        }
        self.write(" (".as_ref())?;
        self.visit(condition)?;
        self.write(") {\n".as_ref())?;
        self.indents_in();
        self.visit_list_format(body)?;
        self.indents_de();
        self.gen_indents()?;
        self.write("}".as_ref())?;
        return self.visit_list(branches);
    }

    fn visit_else(&mut self, body: &NodeList) -> VisitResult {
        self.write("else {\n".as_ref())?;
        self.indents_in();
        self.visit_list_format(body)?;
        self.indents_de();
        self.gen_indents()?;
        return self.write("}".as_ref());
    }
    fn visit_for(&mut self, key: &Token, value: &Token, iter: &Node, body: &NodeList, for_else: &Node) -> VisitResult {
        //TODO: 临时随机变量
        self.write("for (let ".as_ref())?;
        if let &TokenKind::Ignore = value.kind() {
            self.write(key.value())?;
            self.write(" of context.toArray(".as_ref())?;
            self.visit(iter)?;
        } else {
            self.write("[".as_ref())?;
            self.write(key.value())?;
            self.write(", ".as_ref())?;
            self.write(value.value())?;
            self.write("] of context.toMap(".as_ref())?;
            self.visit(iter)?;
        }
        self.write(") {\n".as_ref())?;
        self.indents_in();
        self.for_in();
        self.visit_list_format(body)?;
        self.for_out();
        self.indents_de();
        self.gen_indents()?;
        self.write("}".as_ref())?;
        //TODO: else
        return Ok(());
    }
    fn visit_print(&mut self, body: &Node, escape: &bool) -> VisitResult {
        if self.in_yield {
            self.write("for(let item of context.transOutput(".as_ref())?;
            self.visit(body)?;
            if *escape {
                self.write(", true, true)) {\n".as_ref())?;
            } else {
                self.write(", false, true)) {\n".as_ref())?;
            }
            self.indents_in();
            self.gen_indents()?;
            self.write("yield item\n".as_ref())?;
            self.indents_de();
            self.gen_indents()?;
            self.write("}".as_ref())?;
        } else {
            self.write("context.transOutput(".as_ref())?;
            self.visit(body)?;
            if *escape {
                self.write(", true, false)".as_ref())?;
            } else {
                self.write(", false, false)".as_ref())?;
            }
        }
        return Ok(());
    }
    fn visit_array(&mut self, items: &NodeList) -> VisitResult {
        self.write("[".as_ref())?;
        let mut first = false;
        for item in items {
            if !first {
                first = true;
            } else {
                self.write(",".as_ref())?;
            }
            self.visit(&item)?;
        }
        return self.write("]".as_ref());
    }

    fn visit_map(&mut self, entries: &NodeList) -> VisitResult {
        unimplemented!()
    }

    fn visit_map_entry(&mut self, key: &Node, value: &Node) -> VisitResult {
        unimplemented!()
    }
}