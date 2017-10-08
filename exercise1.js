var prefab : GameObject;

function Start () {
	coffees = new Array(3);
	names = ['small coffee','medium coffee', 'large coffee'];

	for (var i : int = 0; i < 3; i++){
		cofObj = Instantiate(prefab, new Vector3(i*3,0,0),Quaternion.identity);
		cofObj.transform.position += Vector3(-3,0,0);
		cofObj.name = names[i];
		cofText = cofObj.transform.Find('labelCanvas').Find('labelText').GetComponent.<UI.Text>();
		cofText.text = names[i];
		cofObj.transform.Find('object').transform.localScale.z += (i * .1);
		
		cofObj.transform.Find('object').transform.localPosition.z -= (i * .1);
		//cofObj.transform.Find('object').rotation = new Quaternion.Euler(-90,0,0);
		coffees[i] = cofObj; 
		cofObj = null; 
	}

	cor = Random.Range(0,2);
	coffees[cor].tag = "coffeecorrect";
	GameObject.Find('dirtext').GetComponent.<UI.Text>().text = 'select the ' + coffees[cor].name;

	print(GameObject.Find('dirtext').GetComponent.<UI.Text>().text);

	for(var j: int = 0; j < 3; j++){
		if(j != cor){
			coffees[j].tag = "coffeeincorrect";
		}
	}
}

function Update () {
	
}
