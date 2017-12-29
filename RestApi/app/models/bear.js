var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var BearSchema=new Schema({
	name:String
});
var Bear=mongoose.model('Bear',BearSchema);
module.exports=Bear;