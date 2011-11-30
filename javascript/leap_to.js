
function leapto(form)
{
	var links = form.destination.selectedIndex;
	if (links > 0)
        { 
            location = form.destination.options[links].value; 

            var anchor_class = $( "." + location.toString().split('#')[1] );
            anchor_class.next().find('.hide').slideDown('slow');
            anchor_class.closest('td').addClass('hover_hilight');
        
        }
}

