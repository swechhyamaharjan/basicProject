import { Alert } from "react-bootstrap";

function Message({children}){
   return(
    <Alert variant="danger">{children}</Alert>
   )
}
export default Message;