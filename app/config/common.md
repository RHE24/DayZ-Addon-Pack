## DZAP COMMON CONFIG

##### These config options are shared between addons.

-----

### DZE_COLOR_TYPE
> - This config option is for setting up the color scheme of the addons. 
> - Color TYPE can be PRIMARY, SUCCESS, DANGER, or WARNING.
> 
> ##### Format:
>     DZE_COLOR_(TYPE) = [_percentRed,_percentBlue,_percentGreen,_percentOpaque];
> 
> ##### Sample (Assign Green Color To Success Messages):
>     DZE_COLOR_SUCCESS = [(153/255),(204/255),0,1];

### DZE_COLOR_TYPE_HEX
> - The hex color code string (including #) used in addons. 
> - Color TYPE can be PRIMARY, SUCCESS, DANGER, or WARNING.
> 
> ##### Format:
>     DZE_COLOR_(TYPE)_HEX = _hexColor;
> 
> ##### Sample (Assign Blue Color To Primary Messages):
>     DZE_COLOR_PRIMARY_HEX = "#33b5e5";