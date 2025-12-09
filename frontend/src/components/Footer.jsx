function Footer(){
  const currentyear = new Date().getFullYear();
  return(
    <footer>
      <div className="my-3 text-center">&copy; E-Commerce, {currentyear}</div>
    </footer>
  )
}

export default Footer;