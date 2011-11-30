
$(document).ready(function(){

    // For datepicker popup
    $( ".datepicker" ).datepicker();

   // // When user clicks the 'Submit for Review' button check for validations. If there are errors
   // // then stop form submission, add validation html/css, and take user to top of page
   // $("#commit").live('click', function(e) {

   //     // Make sure the Start Date is not after End Date
   //     function date_check(){ 

   //         var datepicker_class = '.datepicker';
   //         var date_start_value = "";
   //         var date_end_value = "";

   //         $( datepicker_class ).each(function(){
   //             
   //             var date_obj = $(this);
   //             var date_obj_attr_name = date_obj.attr('name');

   //             if ( date_obj_attr_name == 'DateStart' )

   //                 { date_start_value = $.datepicker.parseDate("mm/dd/yy", date_obj.val() ); }

   //             else if ( date_obj_attr_name == 'DateEnd' )

   //                 { date_end_value = $.datepicker.parseDate("mm/dd/yy", date_obj.val() ); };
   //         });

   //         if ( date_start_value == "" || date_start_value == null || date_end_value == "" || date_start_value == null )
   //             {
   //                 // prevent form submission
   //                 e.preventDefault();
   //             }
   //         alert('DateStart: ' + date_start_value ); 
   //         alert('DateEnd: ' + date_end_value ); 


   //         if ( date_start_value > date_end_value & date_end_value != null )
   //             {
   //                 $(datepicker_class).addClass('validation_warning'); 
   //                 $(datepicker_class).parent().append('<h2 class="datepicker_date_warning"> The Start Date is after the End Date </h2>');

   //                 // prevent form submission
   //                 e.preventDefault();

   //                 // Take user to top of page 
   //                 $('html, body').animate({ scrollTop: 0 }, 'slow');
   //        
   //             };
   //     };

   //     $('.datepicker_date_warning').remove();

   //     // Invoke function to make sure Start Date is not after End Date
   //     date_check();
   //             
   // });

   
 });

