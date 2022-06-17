const name = (req, res) => {
   console.log("test 1");
   res.json({message:'name api route'})
   console.log("test 2");

}

module.exports = { name }
