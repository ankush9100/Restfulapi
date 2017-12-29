var express=require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var Bear=require('./app/models/bear');
var app=express();
mongoose.connect('mongodb://localhost:27017/bears');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var port=process.env.PORT||3000;
var router=express.Router();

router.route('/bears')
        .post(function(req,res){
       	var bear=new Bear();
       	bear.name=req.body.name;
       	bear.save(function(err){
       		if(err)
       			throw err;
       		res.json("bear created successfully");
       	});
       })
       .get(function(req,res){
       	Bear.find(function(err,bears){
       		if(err)
       			res.send(err);
       		res.json(bears);
       	});
       });
router.route('/bears/:bear_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })
    .put(function(req,res){
    	Bear.findById(req.params.bear_id,function(err,bear){
    		if(err)
    			res.send( err);
    		bear.name=req.body.name;
    		bear.save(function(err){
    			if(err)
    				res.send(err)
    			res.json({message:'Bear updated'});

    		})

    	})
    })
    .delete(function(req,res){
    	Bear.remove({_id:req.params.bear_id},function(err,bear){
    		if(err)
    			res.send(err)
    		res.json({message:"successfully deleted"});
    	})
    })

router.get('/',function(req,res){
	res.json({message:'Hooray our api'});
});

app.use('/api',router);
app.listen(port);
console.log("server islitening on "+port);