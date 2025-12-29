function Footer(){
  const currentyear = new Date().getFullYear();
  return(
    <footer>
      <div className="my-3 text-center">&copy; Gadget E-Commerce, {currentyear}</div>
    </footer>
  )
}

export default Footer;