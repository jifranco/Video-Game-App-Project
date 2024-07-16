const APILINK = 'https://api.rawg.io/api/games?key=4f9ceaeee4874db2860e76ef3ed05083&dates=2022-01-01,2024-07-14&ordering=-added';
const IMG_PATH = 'https://api.rawg.io/api/games/?key=4f9ceaeee4874db2860e76ef3ed05083';
const SEARCHAPI = 'https://api.rawg.io/api/games?key=4f9ceaeee4874db2860e76ef3ed05083&ordering=-relevance&search=""';


const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");


const getPlatformStr = (platform) => {
    const platformStr = platform.map(each => each.platform.name).join(", ")
    if(platformStr.length > 30){
        return platformStr.substring(0,29) + "...";
    }
    return platformStr
};

//This will get the api data and return the results
function returnGames(url){
    fetch(url).then(res=>res.json()).then(function(data){
        console.log(data.results);
        const games = data.results;
        games.forEach(element =>{

            //This is creating the divs for each game 
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card')

            const div_row = document.createElement('div');
            div_row.setAttribute('class', 'row')


            const div_column = document.createElement('div');
            div_column.setAttribute('class', 'column')

            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail')
            image.setAttribute('id', 'image')

            const title = document.createElement('h3');
            div_card.setAttribute('id', 'title')
            

            const platforms = document.createElement('span')
            title.setAttribute('class', 'platforms')


            //It will rewrite the titles, image, and platforms for each div 
            title.innerHTML = `${element.name}`;
            image.src = `${element.background_image}`;
            platforms.innerHTML = `${getPlatformStr(element.parent_platforms)}`

            div_card.appendChild(image);
            div_card.appendChild(title);
            div_card.appendChild(platforms);
            div_column.appendChild(div_card);
            div_row.appendChild(div_column);

            main.appendChild(div_row)
        });
    });

}

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    main.innerHTML= ''

    const searchItem = search.value;

    if (searchItem){
        returnGames(SEARCHAPI +searchItem);
        search.value - '';
    }
})


// function returnGames(url){
//     fetch(url).then(res=>res.json()).then(function(data){
//         console.log(data);
//     });

// }

returnGames(APILINK)