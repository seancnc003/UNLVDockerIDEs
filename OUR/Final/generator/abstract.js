const fs=require("fs");const {Document,Packer,Paragraph,TextRun,AlignmentType}=require("docx");
const abs=fs.readFileSync("abstract.txt","utf8").trim();
const F="Times New Roman",S=24;
const P=(t,o={})=>new Paragraph({children:[new TextRun(Object.assign({text:t,font:F,size:S},o))],alignment:o.center?AlignmentType.CENTER:AlignmentType.LEFT,spacing:{line:o.dbl?480:276,after:120}});
const doc=new Document({sections:[{properties:{page:{size:{width:12240,height:15840},margin:{top:1440,bottom:1440,left:1440,right:1440}}},children:[
P("Undergraduate Research Symposium — Abstract",{center:true}),
P("Decentralized, Browser-Based Docker IDEs for C++ and x86-64 Assembly Education: An Evaluation on the Laptops Students Actually Own",{bold:true,center:true}),
P("Sean Cuenco, Department of Computer Science, University of Nevada, Las Vegas",{center:true}),
P("Faculty Mentor: James Andro-Vasko, Ph.D.  ·  Summer Undergraduate Research Fellowship (SURF) 2026",{center:true}),
new Paragraph({text:""}),
P(abs,{dbl:true}),
P(`(${abs.split(/\s+/).length} words)`,{italic:true,size:20}),
]}]});
Packer.toBuffer(doc).then(b=>{fs.writeFileSync("abstract.docx",b);console.log("wrote abstract.docx")});
