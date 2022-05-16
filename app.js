const recipes = document.querySelector('#recipes')
const form = document.querySelector('#searchForm');



form.addEventListener('submit', async function (e) {
    e.preventDefault();

    try {
        // Found from console.dir(form)
        const searchTerm = form.elements.query.value;
        const apiKey = 'apiKey=02441981d3694f739ac4d96ff1ebcd4c';
        const config = { headers: { 'Content-Type': 'application/json' } }

        // Search Site Content
        // const res = await axios.get(`https://api.spoonacular.com/food/site/search?${apiKey}&query=${searchTerm}&number=3`, config);
        const res = await axios.get(`https://api.spoonacular.com/food/search?${apiKey}&query=${searchTerm}&number=4`, config);


        console.log(res.data);
        const recipeResults = res.data.searchResults[0].results;
        // Loop through all search results
        for (let i = 0; i < recipeResults.length; i++) {


            // TODO: Return error if there are zero results
            if (res.data.searchResults[0].totalResults === 0) {
                console.log('Try another dish')
            }

            // TODO: Remove previous search results
            // console.log(cardParent.childNodes.length)
            // if (recipes.childNodes.length > 1) {
            //     cardParent.childNodes.remove();
            // }

            // Create parent div, append to recipes
            const cardParent = document.createElement('div');
            cardParent.style.width = '300px';
            cardParent.classList.add('card', 'bg-light', 'py-auto', 'my-2');
            recipes.prepend(cardParent);

            // Create card image, append to cardParent
            const cardImg = document.createElement('img');
            cardImg.classList.add('card-img-top');
            cardImg.alt = recipeResults[i].name;
            cardImg.src = recipeResults[i].image;
            cardParent.appendChild(cardImg);

            // Create card body, append to cardParent
            const cardBody = document.createElement('div');
            cardBody.classList.add('bg-light', 'p-3');
            cardParent.append(cardBody);

            // Create card cardTitle, append to cardParent
            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title', 'fw-bold');
            cardBody.insertAdjacentHTML('afterbegin', recipeResults[i].name)
            cardBody.appendChild(cardTitle);


            // Create button, append to cardParent
            const cardLink = document.createElement('a');
            cardLink.setAttribute('role', 'button');
            cardLink.setAttribute('target', '_blank');
            cardLink.classList.add('btn', 'btn-grad', 'mb-2', 'mt-4');
            cardLink.innerText = 'Recipe link'
            cardLink.href = recipeResults[i].link;
            cardBody.appendChild(cardLink);
        }



    } catch (e) {
        console.log("Error: ", e);
    }


});









