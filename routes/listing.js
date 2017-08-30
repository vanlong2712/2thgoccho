var express = require('express');
var router = express.Router();
const dbCity=require('../models/dbcities.js');
const dbSuburb=require('../models/dbSuburb.js');
const dbDistrict=require('../models/dbDistricts.js');
const dbProperty=require('../models/dbRoom.js');
/* GET users listing. */


router.get("/listing",function(req,res)
	{

			if(req.isAuthenticated())
{  
  dbCity.find().exec(function(err,users)
  {
   var dataCity={dataCities:users};
    dbSuburb.find().exec(function(err,users)
    {
      var dataSuburb={dataSuburbs:users}
    dbDistrict.find().exec(function(err,users)
    {
      var dataDistrict={dataDistricts:users};
    dbProperty.find().exec(function(err,users)
      {
          var currentPage;
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }
    else
    {
      currentPage=1;
    }
          var dataProperty={dataProperties:users};  //if document =5 => 2 pages, page 1 4 documents, page 2 1 documents
    
     dbProperty.paginate({}, { page: currentPage, limit: 2}, function(err, result) { // page 1, limit 4:  one page has 4 documents. 
    var pagination={pagination:result};  
     propertyArray=pagination.pagination.docs;
          console.log(currentPage);
          console.log(propertyArray);
  // result.total
  // result.limit - 10
  // result.page - 3
  // result.pages
          res.render('listing',{user:req.user,city:dataCity,district:dataDistrict,suburb:dataSuburb,property:dataProperty,propertyArray:propertyArray,pagination:pagination,currentPage:currentPage});

      })
      });

    })
  })    

  });

     

     

  }

 else
 {

    dbCity.find().exec(function(err,users)
  {
   var dataCity={dataCities:users};
    dbSuburb.find().exec(function(err,users)
    {
      var dataSuburb={dataSuburbs:users}
    dbDistrict.find().exec(function(err,users)
    {
      var dataDistrict={dataDistricts:users};
    dbProperty.find().exec(function(err,users)
      {
          var currentPage;
    if (typeof req.query.page !== 'undefined') {
        currentPage = +req.query.page;
    }
    else
    { //set default current page
      currentPage=1;
    }
          var dataProperty={dataProperties:users};  //if document =5 => 2 pages, page 1 4 documents, page 2 1 documents
    
     dbProperty.paginate({}, { page: currentPage, limit: 4}, function(err, result) { // page 1, limit 4:  one page has 4 documents. 
    var pagination={pagination:result};  //get result after pagination
     propertyArray=pagination.pagination.docs; //set v
          console.log(currentPage);
          console.log(propertyArray);
  // result.total
  // result.limit - 10
  // result.page - 3
  // result.pages
          res.render('listing',{user:req.user,city:dataCity,district:dataDistrict,suburb:dataSuburb,property:dataProperty,propertyArray:propertyArray,pagination:pagination,currentPage:currentPage});

      })
      });
   })

  })
    

  });

 }
})
 		

module.exports = router;
