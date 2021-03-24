const $mainRight = document.getElementById('main-right');
const $cardTpl = document.getElementById('card-frends-template');

function request(method, url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.send();
		xhr.onload = function () {
			if (xhr.status === 200) {
				resolve(JSON.parse(xhr.response));
			} else {
				reject(xhr);
			}
		};
	});
}

/* request('GET', 'https://reqres.in/api/users?page=1')
	.then(function (response) {
		const cardsArray = response.data;

		cardsArray.forEach((user) => {

			const deleteUser = function () {
				$card.remove()
				$deleteUser.removeEventListener('click', deleteUser);
			}

			const $card = $cardTpl.cloneNode(true);

			$card.removeAttribute('id');
			$card.removeAttribute('style');

			const $userName = $card.querySelector('.js-user-name');
			const $userAva = $card.querySelector('.js-user-ava');

			$userName.textContent = `${user.first_name}`;
			$userAva.setAttribute('src', user.avatar);

			$mainRight.append($card);

			const $deleteUser = $card.querySelector('.btn-delete-user');

			$deleteUser.addEventListener('click', deleteUser)
		});
	}); */

request('GET', 'https://reqres.in/api/users?page=1')
	.then(function (response) {
		const cardsArray = response.data;

		cardsArray.forEach((user) => {

			const $card = $cardTpl.cloneNode(true);

			$card.removeAttribute('id');
			$card.removeAttribute('style');

			const $userName = $card.querySelector('.js-user-name');
			const $userAva = $card.querySelector('.js-user-ava');

			$userName.textContent = `${user.first_name}`;
			$userAva.setAttribute('src', user.avatar);

			$mainRight.append($card);
		});
	});

document.getElementById('main-right').addEventListener('click', event => {

	const deleteUser = event.target;

	if (deleteUser.classList.contains('btn-delete-user')) {
		const deleteCardUser = deleteUser.closest('.card-friends');
		deleteCardUser.remove();
	}
})

/* pagination */
//=================================//
// selecting required element
const element = document.querySelector(".pagin ul");
let totalPages = 20;
let page = 10;

//calling function with passing parameters and adding inside element which is ul tag
element.innerHTML = createPagination(totalPages, page);
function createPagination(totalPages, page){
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if(page > 1){ //show the next button if the page value is greater than 1
    liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${page - 1})"><span>Prev</span></li>`;
  }

  if(page > 2){ //if page value is less than 2 then add 1 after the previous button
    liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
    if(page > 3){ //if page value is greater than 3 then add this (...) after the first li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  // how many pages or li show before the current li
  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  // how many pages or li show after the current li
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage  = afterPage + 1;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) { //if plength is greater than totalPage length then continue
      continue;
    }
    if (plength == 0) { //if plength is 0 than add +1 in plength value
      plength = plength + 1;
    }
    if(page == plength){ //if page is equal to plength than assign active string in the active variable
      active = "active";
    }else{ //else leave empty to the active variable
      active = "";
    }
    liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
  }

  if(page < totalPages - 1){ //if page value is less than totalPage value by -1 then show the last li or page
    if(page < totalPages - 2){ //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) { //show the next button if the page value is less than totalPage(20)
    liTag += `<li class="btn next" onclick="createPagination(totalPages, ${page + 1})"><span>Next</span></li>`;
  }
  element.innerHTML = liTag; //add li tag inside ul tag
  return liTag; //reurn the li tag
}