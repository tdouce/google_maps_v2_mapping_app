
$(document).ready(function(){


    // Function used throughout to scroll to '#id' so the map and table row that is being viewed are lined up next to each other
    function goToByScroll( scroll_to_id ){
    
        if( $("#show_all_maps_input").is(":checked")  )
            { 
                var table_div_height = ( $("#form_container_extra").height() + 300 ) + "px";
                
                $('.content').css('height', table_div_height );
                $('html,body').animate({scrollTop: $( "#" + scroll_to_id ).offset().top - 205 },'slow');
            }
        else
            {
                $('html,body').animate({scrollTop: $( "#" + scroll_to_id ).offset().top - 205 },'slow');
            }
    };

 
    // Corrects height of .content so that the 'All Results' map fits completely within
    // the div in case there are too few table rows returned by the query
    function fixed_positioning_height( number_of_rows ){
        if ( $('tr.hover').length < number_of_rows )
            {
                $('.content').css('height','650px');
            };
    };

    // Invokes the function to correct page height in the case that too few results were returned by
    // query
    fixed_positioning_height( 20 );


    // Resets all the styling to default.
    function set_default_styling(){
        $('tr').css({'font-weight':'normal','color':''});
        $('.show_point').hide();
        $('*').removeClass('map_selected');
    };

    
    // Checks where or not the 'Hide all maps' checkbox is checked or not.  Hide
    // or display all maps in 'All results' table according to checkbox status
    function check_hidden_checkbox_status(){

        // hide all maps if checked
        if( $("#show_all_maps_input").is(":checked")  )
            { 
                $('.map').hide(); 
            }

        // show all maps if not checked
        else
            {
                $('.content').css('height','');
                $('.map').show();
            };
    };

    // Displays all maps in 'All Results' tables if 'Hide all maps' input is checked and
    // shows all maps if NOT checked.  Displays all maps or hides all maps immediately when 
    // user checks or unchecks the 'Hide all maps' input.
    function should_show_all_maps(){
        
        // Show or hide all maps immediately when checkbox status changes (ie. when checked or not checked)
        $("#show_all_maps_input").change(function(){

            // Invoke function to check status of 'Hide all maps' input
            check_hidden_checkbox_status();

        });

        // Invoke function to check status of 'Hide all maps' input
        check_hidden_checkbox_status();
    };


    // Generates a map for each table row/station in the 'All Results' table.
    function table_results_map(){

        var map;
        
        // Loop through each div with the class 'map' and generate a map 
        $.each( $(".map"), function(){ 

            var div_id  = $(this).attr('id');
            var lat     = $(this).attr('data-lat') ;
            var lng     = $(this).attr('data-long') ;

            // Map Controls
            map = new GMap2(document.getElementById(div_id)); // Google API code: generates map canvas
            map.setCenter(new GLatLng( lat, lng ), 6); // Google API code: sets center of map and zoom in/out scale
            map.setUIToDefault();  // Google API code: generates the zoom in/out scale bar
            //map.addControl(new GOverviewMapControl()); // Google API code: generates the setin map in lower right hand corner

            // Generate point
            var point = new GLatLng( lat, lng );

            // Add point to map
            map.addOverlay( new GMarker(point) );

        });
    };

    
    // Generates 'All Results' map and add interaction between 'All Results' table and 'All Results' map
    function show_page_results(){

        var map = new GMap(document.getElementById("map"));

        map.setUIToDefault();  // Google API code: generates the zoom in/out scale bar
        map.addControl(new GOverviewMapControl()); // Google API code: generates the setin map in lower right hand corner
        map.setCenter(new GLatLng(0,0),0); // Set center to nothing because we are going to determine the zoom based on the markers generated from the json

        var bounds = new GLatLngBounds(); // Used to zet the center and zoom baseed on the markers generated from the json

        // An array that is used to store the markers (as objects) so that when we click on a marker
        // in the results table, the corresponding marker in the 'All Results' map will be hi-lited.
        var gmarkers = [];

        //A function to create the marker and set up the event window
        function createMarker(point,name,html) {

            var marker = new GMarker(point);

            // Used to autogenerate zoom and center
            bounds.extend( point );

            // Adds a listener to the marker in the 'All Results' map
            GEvent.addListener(marker, "click", function() {

                // pan to marker on click
                map.panTo( marker.getLatLng() );
                
                // Pass in the html that the marker will have when clicked 
                marker.openInfoWindowHtml( html );

                //fixed_positioning_height();

                // Invokes function to set css styling to default for the 'All Results' table
                set_default_styling();

                //alert('here again');
                $('.content').css('height','');

                // When marker is clicked use the name passed in from the json to look for
                // corresponding 'id' and show the hidden div and add styling
                var parent_table_row =  $( '#' + name ).closest('.show_point');
                parent_table_row.show();
                parent_table_row.prev().addClass('map_selected');
                //alert( parent_table_row.prev().attr('data-name')) ;
                parent_table_row.prev().css({'font-weight':'bold','color':'#06C'});

                // Scrolls to top of associated table row in the 'All Results' table. The 'All
                // Results' Map will line up with it's associated table row
                goToByScroll( parent_table_row.prev('.hover').attr('id') );

            });

            // Pass in data to the associative array so we can call it up later. The name being
            // passed (with the associated marker in the 'All results' map) matches the 'id' in the
            // results table. This is the key to interaction between the the 'All Resuts' map and the table
            gmarkers[name] = marker

            return marker;
        }

        // When the results table row is clicked close all hidden divs, remove all map styling
        // open up the hidden div correspondig to the table row and add styling. Also, open up the
        // corresponding marker bubble in the 'All Results' map.
        $('tr.hover').click(function(){

            //alert('here'); 
            set_default_styling()

            var scroll_to_id = $(this).attr('id');

            // Invoke function. Displays all maps in 'All Results' tables if 'Hide all maps' input is checked and
            // shows all maps if NOT checked.  Displays all maps or hides all maps immediately when 
            // user checks or unchecks the 'Hide all maps' input.
            should_show_all_maps();

            $(this).next('.show_point').show();
            $(this).addClass('map_selected');
            $(this).css({'font-weight':'bold','color':'#06C'});
            //$('.content').css('height',''); // Take away if don't used fixed positioning

            // Invokes function to scroll to the 'All Results' map to the table row that is clicked on 
            goToByScroll( scroll_to_id );

            // This is the key to the interaction between the all results table and map. It is based
            // on having the name in the json match the 'id' in the hidden div. 
            gmarkers[ $(this).next().find('.map').attr('id') ].openInfoWindowHtml( "<h1>" + $(this).attr('data-name') + "</h1>" );
           
            //var lat = $(this).next('.show_point').find('.map').attr('data-lat');
            //var lng = $(this).next('.show_point').find('.map').attr('data-long');
            
            // Sets marker to center of map
            map.panTo( gmarkers[ $(this).next().find('.map').attr('id') ].getLatLng() );



        }); 


        // Onclick zoom to full extent(i.e. all the markers can be viewed at one time)
        $("#to_full_extent").click(function () { 
            map.setCenter( bounds.getCenter() );
            map.setZoom(map.getBoundsZoomLevel(bounds) - 1);
        });
 

        //When user clicks 'Hide/Show this map', then hide or show the map and scroll to focused div
        $(".hide_this_map").click(
            function() {

                // Check to see if '.map' is hidden
                var is_hidden = $(this).parent().parent().siblings('.map').is(":hidden");

                // If hidden, then show it
                if ( is_hidden == true)
                {

                    $(".content").css('height','');
                    $(this).parent().parent().siblings('.map').show();

                    // Inovke function to align the table row that is clicked on with the 'All results' map
                    goToByScroll( $(this).closest('.show_point').prev().attr('id') );

                    // This is the key to the interaction between the all results table and map. It is based
                    // on having the name in the json match the 'id' in the hidden div. 
                    gmarkers[$(this).parent().parent().siblings('.map').attr('id') ].openInfoWindowHtml( "<h1>" + $(this).closest('.show_point').prev().attr('data-name') + "</h1>" );

                }

                // If visible, then hide it
                else
                {
                    $(this).parent().parent().siblings('.map').hide();

                    // Inovke function to align the table row that is clicked on with the 'All results' map
                    goToByScroll( $(this).closest('.show_point').prev().attr('id') );

                    // This is the key to the interaction between the all results table and map. It is based
                    // on having the name in the json match the 'id' in the hidden div. 
                    gmarkers[$(this).parent().parent().siblings('.map').attr('id') ].openInfoWindowHtml( "<h1>" + $(this).closest('.show_point').prev().attr('data-name') + "</h1>" );

                };

        }); 

                

        // Define function to process the json
        process_it = function(doc) {

            var jsonData = eval('(' + doc + ')');

            // Add markers to 'All Results' map 
            for (var i=0; i<jsonData.markers.length; i++) {

                var point = new GLatLng(jsonData.markers[i].lat, jsonData.markers[i].lng);
                var marker = createMarker(point, jsonData.markers[i].label, jsonData.markers[i].html);
                map.addOverlay(marker);
            }

        // now that all the markers have been mapped, we can autogenerate the zoomlevel and
        // map-center
        map.setZoom(map.getBoundsZoomLevel(bounds) - 1);
        map.setCenter( bounds.getCenter() );
        
        }          

        //  Fetch the JSON data file 
        GDownloadUrl("example_2.js", process_it);

    };


    // Call the function that generates the 'All Results' map and adds the interaction
    // between the all results table and 'All Results' map.
    show_page_results();

    // Invoke the function that generates a map for each site/table row in the 'All Results' table
    table_results_map();

    // Change table row to highlighted color when user hovers over
    $("tr.hover").hover(
      function () {
        $(this).css({ 'background-color':'#d6e8ee','cursor':'pointer' });
      }, 
      function () {
        $(this).css('background-color','');
      }
    );

   
    // Hide all divs that should be hidden, i.e. the divs that contain the map and information
    // about a specific point
    $('.show_point').hide(); 

   
    // Makes any href link inside the <tr> respond to the href click rather (so they can visit the
    // associated link) than the opening or hovering events. 
    $('tr a').click(function(e){
        e.stopPropagation(); 
    })


    // The 'click' event is used rather than the 'toggle' because the user might want to close all
    // the hidden divs on the first click rather than first having to show all of them and THEN hide
    // then all.  So, an even it tied to the 'Show' and 'Hide' text respectively.
    // When user clicks on the "Show" in the 'Show / Hide all" text all the hidden divs appear
    $('#all_results_table_show').click(
            function() {

                // Invoke function. Displays all maps in 'All Results' tables if 'Hide all maps' input is checked and
                // shows all maps if NOT checked.  Displays all maps or hides all maps immediately when 
                // user checks or unchecks the 'Hide all maps' input.
                should_show_all_maps();

                $('.show_point').show('slow');
                $(".hover").addClass('map_selected');
                $('tr.hover').css({'font-weight':'bold','color':'#06C'});

                // Removes the fixed positioning height
                $('.content').css('height','');
                
            }); 

    // When user clicks on the "Hide" in the 'Show / Hide all" text all the hiddens divs become hidden again.
    $('#all_results_table_hide').click(
            function() {
                $('.show_point').hide('fast');
               
                // Invokes function to set css styling to default for the 'All Results' table
                set_default_styling();

                // Invoke function.  Sets .content height to fit appropriately if too few rows were
                // returned from query
                fixed_positioning_height(20)
            }); 


    // When user clicks the 'Show / Hide' text associated with the map that contains all the markers
    // for this page, the map div shrinks up and to the left AND the all results table exands to the left.
    // When user clicks the text again the reverse happens. 
    $('#all_results_map').toggle(
            function() {
                $('#map_holder').fadeOut('slow');
                $('#to_full_extent').hide();
                $('#download_text').hide();
                $('#map-container').animate({
                    height: "3.5%", 
                    width:  "200px",
                },'slow')

                $('#map_cont_slide').animate({
                    //direction: 'right',
                    width: '230px',
                    right: '16%', 
                
                },'slow')

                $('#form_container_extra').animate({
                    width: "63%", 
                
                },'slow')
            },
            function() {
                $('#map_holder').fadeIn('slow');
                $('#map-container').animate({
                    height: "480px", 
                    width:  "100%",
                
                },'slow')

                 $('#map_cont_slide').animate({
                    //direction: 'right',
                    width: '37%',
                    right: '6%', 
                
                },'slow')



                $('#form_container_extra').animate({
                    width: "50%", 
                
                },'slow')              

                $('#to_full_extent').show();
                $('#download_text').fadeIn('slow');
            }
        ); 

     // Change close text to highlighted color when user hovers over
    $(".close , .back_to_top, .hide_this_map, #to_full_extent, .all_results ").hover(
        function () {
            $(this).css({ 'color':'#06C','cursor':'pointer' });
        }, 
        function () {
            $(this).css('color','');
        }
    );


    // Function used with '.close' to close the '.show_point' element
    function close_element( dom_element ){
        dom_element.closest('.show_point').hide();
        dom_element.closest('.show_point').prev('.hover').css({'font-weight':'normal','color':''});
        dom_element.closest('.show_point').prev('.hover').removeClass('map_selected');
    };

    // When user clicks the "close" text, close the '.show_point' div. If only one 'show_point' div
    // is visible, then scroll to top.  Otherwise do NOT scroll anywhere 
    $('.close').click(
        function() {

            // Get number of visible elements
            var visible_length =  $(".show_point").filter(":visible").length;

            // If there are more than one visible elements, then only close ".show_point" and do NOT
            // scroll to top
            if( visible_length > 1 ) 
                {
                    // Can NOT use the 'set_default_styling()' function because we do NOT
                    // want to set default styling for everything, just the div that is closed
                    // Invoke function to close the element
                    close_element( $(this) );

                }

            // If there is only One visible ".show_point" element then scroll to top THEN close the
            // '.show_point' element and give correct css height.
            else
                {
                    // Have to put this in a variable because $(this) was not working inside 'animatae'
                    var last_hidden_element = $(this);
                       
                    $('html, body').animate({ 
                        scrollTop: 0 

                        }, 'slow', function(){

                        // Invoke function to close the element
                        close_element( last_hidden_element );

                        // reset css height after scroll to top completes animation  
                        fixed_positioning_height( 20 );
                       
                        });
                       
                };
    }); 

        
    // When user clicks 'Back to top', then scroll to top of page 
    $(".back_to_top").click(
        function() {

        $('html, body').animate({ scrollTop: 0 }, 'slow');
           
    }); 


 });

