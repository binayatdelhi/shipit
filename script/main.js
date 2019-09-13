$(document).ready(function(){
    start();
  });
  var start=function(){
    $('.qr-button').click(function(){
       scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
        scanner.addListener('scan', function (content) {
          scanner.stop();
          getReviews(content);
        });
        Instascan.Camera.getCameras().then(function (cameras) {
          if (cameras.length > 0) {
            if(cameras.length>1){
              scanner.start(cameras[1]);
            }else{
              scanner.start(cameras[0]);
           }
  
          } else {
            console.error('No cameras found.');
          }
        }).catch(function (e) {
          console.error(e);
        });
    });
    $('.close').click(function(){
      scanner.stop();
      $('.modal-body').find('video').css('display','block');
      $('.review-body').css('display','none');
    });
  };
  
  var getReviews=function(productId){
    $.get('./json/'+productId+'.json',function(data, status){
      $('.modal-body').find('video').css('display','none');
      $('.review-body').html('');
      $('.review-body').css('display','block');
      var str='';
      str+="<div><img src='imageurl' alt=''></div>"
      str+="<div class='product-name'>productname</div>"
      str+="<div class='description'>productdescription</div>"
      str+="<a href='producturl' class='readmore'>Read More</a>"
      str+="<div>User Reviews</div>"
      for(var i=0;i<data.reviews.length;i++){
        var domStr=getReviewDom();
        domStr=domStr.replace('reviewtime',data.reviews[i].reviewDate);
        domStr=domStr.replace('reviewvername',data.reviews[i].reviewedBy);
        domStr=domStr.replace('reviewcomment',data.reviews[i].reviewComments);
        str+=domStr;
      }
      str=str.replace('imageurl',data.prodImg);
      str=str.replace('productname',data.prodName);
      str=str.replace('productdescription',data.prodDesc);
      str=str.replace('producturl',data.interact);
      $('.review-body').html(str);
    });
  }
  
  var getReviewDom=function(){
    var reviewDOM='';
    reviewDOM+="<div class='card'>"
    reviewDOM+="<div class='card-body'>"
    reviewDOM+="<div class='row'>"
    reviewDOM+="<div class='col-md-2'>"
    reviewDOM+="<p class='text-secondary text-center'>reviewtime</p>"
    reviewDOM+="</div>"
    reviewDOM+="<div class='col-md-10'>"
    reviewDOM+="<p>"
    reviewDOM+="<a class='float-left reviewer-name' href='https://maniruzzaman-akash.blogspot.com/p/contact.html'><strong>reviewvername</strong></a>"
    reviewDOM+="<span class='float-right'><i class='text-warning fa fa-star'></i></span>"
    reviewDOM+="<span class='float-right'><i class='text-warning fa fa-star'></i></span>"
    reviewDOM+="<span class='float-right'><i class='text-warning fa fa-star'></i></span>"
    reviewDOM+="<span class='float-right'><i class='text-warning fa fa-star'></i></span>"
    reviewDOM+="</p>"
    reviewDOM+="<div class='clearfix'></div>"
    reviewDOM+="<p>reviewcomment</p>"
    reviewDOM+="<p>"
    reviewDOM+="<a class='float-right btn btn-outline-primary ml-2'> <i class='fa fa-reply'></i> Reply</a>"
    reviewDOM+="<a class='float-right btn text-white btn-danger'> <i class='fa fa-heart'></i> Like</a>"
    reviewDOM+="</p>"
    reviewDOM+="</div></div></div></div>";
    return reviewDOM;
  }
  