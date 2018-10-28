//Dem variables
var randomImagesUrl = "https://dog.ceo/api/breeds/image/random/6";
var allBreedsUrl = "https://dog.ceo/api/breeds/list/all";
var defaultDoggyImg = "./default_pet.jpg";
var currentlyRequesting = false;

var breedSelect = "";
var subBreedSelect = "";

var selectedBreed = "";
var selectedSubBreed = "";


var dogApi = "";new XMLHttpRequest();


var breeds = [];

function onLoad()
{
    dogApi = new XMLHttpRequest();

    breedSelect = document.querySelector("#breedSelect");
    subBreedSelect = document.querySelector("#subBreedSelect");

    dogApi.onreadystatechange = function()
        {
            breeds=JSON.parse(dogApi.responseText).message;
            setBreeds(breeds);
            //Get images first without breed or sub-breed
            getImages(selectedBreed, selectedSubBreed);
        }

    //Do call for API
    currentlyRequesting = true;
    dogApi.open("GET", allBreedsUrl, true);
    dogApi.send()
}



function DogMe()
{
    if(currentlyRequesting) return;
    currentlyRequesting = true;
    getImages(selectedBreed,selectedSubBreed);
}

function breedImagesUrl(breed)
{
    return "https://dog.ceo/api/breed/" + breed + "/images/random/6";
}

function subBreedImagesUrl(breed, subBreed)
{
    return "https://dog.ceo/api/breed/" + breed + "/" + subBreed + "/images/random/6";
}

function setBreeds()
{
    //Add default
    addOption("All", breedSelect)

    for (breed in breeds)
    {
       addOption(breed, breedSelect);
    }

    setSubBreeds()
}

function setSubBreeds()
{
    var numSubBreeds = 0;
    
    if (selectedBreed != "")
    {
        numSubBreeds = breeds[selectedBreed].length;
    }

    if (numSubBreeds == 0)
    {
        subBreedSelect.options.length = 0;
        subBreedSelect.setAttribute("disabled",true);
        addOption("N/A",subBreedSelect)
    }
    else
    {
        subBreedSelect.options.length = 0;

        addOption("All",subBreedSelect);

        breeds[selectedBreed].forEach(element => {
            addOption(element,subBreedSelect);
        });
        subBreedSelect.removeAttribute("disabled");
    }
}

function addOption(text,select)
{
    var option = document.createElement("option");
    option.text = text.charAt(0).toUpperCase() + text.slice(1);
    option.setAttribute("value",text);

    select.add(option);
}

function breedChange()
{
    var selBreed = breedSelect.options[breedSelect.selectedIndex].value;

    if(selBreed == "All")
    {
        selectedBreed = "";
    }
    else
    {
        selectedBreed = selBreed;
    }

    setSubBreeds();
}

function subBreedChange()
{
    var selSubBreed = subBreedSelect.options[subBreedSelect.selectedIndex].value;

    if(selSubBreed == "All")
    {
        selectedSubBreed = "";
    }
    else
    {
        selectedSubBreed = selSubBreed;
    }
}

function getImages(breed, subBreed)
{
    if(breed == "")
    {
        imageUrl = randomImagesUrl;
    }
    else if(subBreed == "")
    {
        imageUrl = breedImagesUrl(breed);
    }
    else
    {
        imageUrl = subBreedImagesUrl(breed, subBreed);
    }

    dogApi.onreadystatechange = function()
        {
            if (dogApi.readyState != 4 || dogApi.status != 200) return;

            currentlyRequesting = false;

            var newDog = JSON.parse(dogApi.responseText).message;

            var anyLackingDoggies = false;

            if (newDog[0] != undefined) document.querySelector("#dog1>img").setAttribute("src",newDog[0]);
            else
            {
                document.querySelector("#dog1>img").setAttribute("src",defaultDoggyImg);
                anyLackingDoggies = true;
            } 

            if (newDog[1] != undefined) document.querySelector("#dog2>img").setAttribute("src",newDog[1]);
            else
            {
                document.querySelector("#dog2>img").setAttribute("src",defaultDoggyImg);
                anyLackingDoggies = true;
            } 
            
            if (newDog[2] != undefined) document.querySelector("#dog3>img").setAttribute("src",newDog[2]);
            else
            {
                document.querySelector("#dog3>img").setAttribute("src",defaultDoggyImg);
                anyLackingDoggies = true;
            } 
            
            if (newDog[3] != undefined) document.querySelector("#dog4>img").setAttribute("src",newDog[3]);
            else
            {
                document.querySelector("#dog4>img").setAttribute("src",defaultDoggyImg);
                anyLackingDoggies = true;
            } 
            
            if (newDog[4] != undefined) document.querySelector("#dog5>img").setAttribute("src",newDog[4]);
            else
            {
                document.querySelector("#dog5>img").setAttribute("src",defaultDoggyImg);
                anyLackingDoggies = true;
            } 
            
            if (newDog[5] != undefined)  document.querySelector("#dog6>img").setAttribute("src",newDog[5]);
            else
            {
                document.querySelector("#dog6>img").setAttribute("src",defaultDoggyImg);
                anyLackingDoggies = true;
            } 
            
            
            if(anyLackingDoggies) popup("What!?! Their weren't enough images of this breed/sub-breed to fill the screen with glorious doggies. If you have such a doggie submit your doggie to https://github.com/jigsawpieces/dog-api-images#dog-api-images")
        }

    //Do call for API
    dogApi.open("GET", imageUrl, true);
    dogApi.send()
}

function popup(text)
{
    alert(text);
}