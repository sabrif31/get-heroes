import{n,T as c,z as d,j as e,e as o}from"./index-5f314384.js";import{C as i}from"./TextField-fa0a5117.js";import t from"./Button-7d14c08a.js";import{u}from"./useForm-a23e1795.js";import{D as g}from"./Divider-5e51c206.js";import{B as h}from"./Box-b761e9c8.js";import"./useTheme-ae63015e.js";import"./TransitionGroupContext-bd42b5cc.js";import"./useForkRef-9ca0de2f.js";import"./useIsFocusVisible-a287826f.js";const y=()=>{const{loginWithPopup:a}=d(),s={email:"",password:""},{onChange:r,onSubmit:l,values:m}=u(p,s);async function p(){console.log("values",m)}return e("div",{style:{width:"300px"},children:[o(x,{variant:"h4",children:"Login"}),e(f,{onSubmit:l,children:[o(i,{changeHandler:r,label:"Email",name:"email",type:"email"}),o(i,{changeHandler:r,label:"Password",name:"password",type:"password"}),o(t,{type:"submit",variant:"contained",children:"LOGIN"})]}),o(t,{type:"button",onClick:()=>console.log("Forgot your password"),children:"Forgot your password ?"}),o(w,{}),o(t,{type:"button",variant:"outlined",onClick:()=>a(),children:"Login with Auth0"})]})},f=n.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,x=n(c)`
  margin: 0px 0 8px 0;
`,w=n(g)`
  margin: 0px 0 8px 0;
`,P=()=>o(h,{children:o(y,{})});export{P as default};
