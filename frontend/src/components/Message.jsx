import { Alert } from "react-bootstrap";

function Message({variant="danger", children}){ //by default danger
   return(
    <Alert variant={variant}>{children}</Alert>
   )
}
export default Message;