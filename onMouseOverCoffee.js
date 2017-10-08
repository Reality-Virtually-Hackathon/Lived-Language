 var colorChanged = false; 
 var baseColor;
 var text;
 var trialCount = 0;
 var defaultObj;
 var materials;
 var newColor;
 var audioSource;
 var soundCue : AudioClip;
 


 function Start(){
    audioSource = gameObject.AddComponent(AudioSource);
	soundCue = Resources.Load('SFX_CORRECT');
	GetComponent.<AudioSource>().clip = soundCue;
	GetComponent.<AudioSource>().PlayOneShot(Resources.Load('SFX_GLOW'));

	baseColor = Color.white;
	newColor = baseColor;
	parentObj = gameObject.transform.parent;
	text = parentObj.Find('labelCanvas').Find('labelText').GetComponent.<UI.Text>();
	text.enabled = false;

	defaultObj = transform.Find('default');
 };

 function OnMouseOver() 
 {
  
    startcolor = baseColor;
	startTextcolor = text.color;
	parentObj = gameObject.transform.parent;

	// Checking on coffee [correct, incorrect] via tag
	if(parentObj.tag == ('coffeecorrect')){
    	//if (!GetComponent.<AudioSource>().isPlaying) {
		//	GetComponent.<AudioSource>().PlayOneShot(Resources.Load('SFX_CORRECT'));
		//}
		newColor = Color.green;
		text.enabled = true;
		var coffees = GameObject.FindGameObjectsWithTag('coffeeincorrect');
		for (var coffee: GameObject in coffees) {
			ct = coffee.transform.Find('labelCanvas').Find('labelText').GetComponent.<UI.Text>();
			if(ct != text){
				obje = coffee.transform.Find('object').Find('default'); 
				if(obje.GetComponent.<Renderer>()){
					obje.GetComponent.<Renderer>().enabled = false;
				}
				if (obje.transform.Find("default")){
						obje.transform.Find("default").GetComponent.<Renderer>().enabled = false;
					}
				ct.enabled = false;
			}
		}
		text.color = startTextcolor.Lerp(startTextcolor, newColor, 2f*Time.deltaTime);
	    colorChanged = true;
	}
	else{
		newColor = Color.red;
		text.color = startTextcolor.Lerp(startTextcolor, newColor, 2f*Time.deltaTime);
	    colorChanged = true;
	 };
	  text.color = startTextcolor.Lerp(startTextcolor, newColor, 2f*Time.deltaTime);
	  colorChanged = true;
 };

 function OnMouseEnter()
 {
	if (!GetComponent.<AudioSource>().isPlaying) {
		parentObj = gameObject.transform.parent;
		// Checking on coffee [correct, incorrect] via tag
		if(parentObj.tag == ('coffeecorrect')){
			GetComponent.<AudioSource>().PlayOneShot(Resources.Load('SFX_CORRECT'));
		}
	    else{
			GetComponent.<AudioSource>().PlayOneShot(Resources.Load('SFX_INCORRECT'));
			}
		}

	trialCount++;
	if(trialCount > 3){
		text.enabled = true;
	}
 }

function Update () {
    if (colorChanged){
		
		trialCount++;
        startcolor = newColor;
		startTextcolor = text.color;
		text.color = startTextcolor.Lerp(startTextcolor, Color.black, 2f*Time.deltaTime);
	};
};
