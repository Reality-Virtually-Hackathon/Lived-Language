 var colorChanged = false; 
 var baseColor;
 var text;
 var trialCount=0;

 function Awake(){
	if (gameObject.Find("default")){
		baseColor =  GetComponent.<Renderer>().material.color;
	}
	else{
		baseColor =  GetComponent.<Renderer>().material.color;
	}
	parent = transform.parent.gameObject;
	text = parent.transform.Find('labelCanvas').Find('labelText').GetComponent.<UI.Text>();
	text.enabled = false;
 };

 function OnMouseOver() 
 {
    print("mouseover");
    startcolor = GetComponent.<Renderer>().material.color;
	startTextcolor = text.color;
	newColor = startcolor;
	if(gameObject.tag == ('correct')){
		newColor = Color.green;
		text.enabled = true;
		var coffees = GameObject.FindGameObjectsWithTag('coffee');
		for (var coffee: GameObject in coffees) {
			ct = coffee.transform.Find('labelCanvas').Find('labelText').GetComponent.<UI.Text>();
			if(ct != text){
				obje = coffee.transform.Find('object'); 
				if(obje.GetComponent.<Renderer>()){
					obje.GetComponent.<Renderer>().enabled = false;
				}
				if (obje.transform.Find("default")){
						obje.transform.Find("default").GetComponent.<Renderer>().enabled = false;
					}
				ct.enabled = false;
			}
		}
	}
	else{
		newColor = Color.red;
	};
	  GetComponent.<Renderer>().material.color = startcolor.Lerp(startcolor, newColor, 2f*Time.deltaTime);
	  text.color = startTextcolor.Lerp(startTextcolor, newColor, 2f*Time.deltaTime);
	  colorChanged = true;
 };

 function OnMouseEnter()
 {
	trialCount++;
	if(trialCount > 3){
		text.enabled = true;
	}
 }

function Update () {
    if (colorChanged){
		
		trialCount++;
        startcolor = GetComponent.<Renderer>().material.color;
		startTextcolor = text.color;
		GetComponent.<Renderer>().material.color = startcolor.Lerp(startcolor, baseColor, 2f*Time.deltaTime);
		text.color = startTextcolor.Lerp(startTextcolor, Color.black, 2f*Time.deltaTime);
	};
};
