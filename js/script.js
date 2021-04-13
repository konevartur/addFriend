// получение элементов из DOM
const $mainRight = document.getElementById('main-right');
const $cardsWrapper = document.getElementById('cards-wrapper');
const $cardTpl = document.getElementById('card-frends-template');

/* const $preloader = document.querySelector('#preloader'); */

const $modal = document.getElementById('mymodal');

// удалить карточку через делегирование
// открыть модальное окно через делегирование
$mainRight.addEventListener('click', event => {
	if (event.target.classList.contains('btn-delete-user')) {
		const deleteCardUser = event.target.closest('.card-friends');
		deleteCardUser.remove();
	}

	if (event.target.classList.contains('js-btn-info')) {
		mymodal.style.display = 'block';
	}

	if (event.target.classList.contains('fa-times-circle')) {
		mymodal.style.display = 'none';
	}
});


// закрываю модальное по нажатию на пустое место
window.addEventListener('click', event => {
	if (event.target == $modal) {
		mymodal.style.display = 'none';
	}

	if (event.target == $modalCreateFriend) {
		modal_cf.style.display = 'none';
	}
});

// модальное окно по созданию записи о друге
const $btnCreateFriend = document.getElementById('btn-create-friend');
const $modalCreateFriend = document.getElementById('modal_cf');
const $closeModalCreateFriend = document.querySelector('.close-modal-cf');

$btnCreateFriend.addEventListener('click', () => {
	modal_cf.style.display = 'block';
});

// закрываю модальное окно на крест
$closeModalCreateFriend.addEventListener('click', () => {
	modal_cf.style.display = 'none';
});

// отправка формы
const $form = document.getElementById('modal-cf-form');
$form.addEventListener('submit', submitHandler);

function submitHandler(event) {
	event.preventDefault();
	//event.target.reset();

	const formData = new FormData($form);
	const values = Object.fromEntries(formData.entries());

	const localValues = JSON.stringify(values);
	console.log(localValues);
}

// запись успешно создана
const $btnNoteDone = document.querySelector('.modal-cf-form-btn');

$btnNoteDone.addEventListener('click', () => {
	note_done.style.display = 'block';
	modal_cf.style.display = 'none';

	setTimeout(() => {
		note_done.style.display = 'none';
	}, 2000);
});

// пример
/* const $form = document.querySelectorAll('input');
for (let i = 0; i < $form.length; i++) {
	console.log($form[i].value);
} */

// загрузка фотографии
upload({
	accept: ['.png', '.jpg', '.jpge', '.gif']
});

function upload(options = {}) {
	const $uploadImg = document.getElementById('modal-cf-file');
	const $avaInModal = document.querySelector('.modal-cf-ava');

	const $open = document.createElement('button');
	$open.classList.add('modal-cf-file-btn');
	$open.textContent = 'Выбрать фотографию';

	$open.addEventListener('click', triggerInput);
	$uploadImg.addEventListener('change', changeImg);

	$uploadImg.insertAdjacentElement('afterend', $open);

	if (options.accept && Array.isArray(options.accept)) {
		$uploadImg.setAttribute('accept', options.accept.join(','));
	}

	function changeImg(event) {
		if (!event.target.files.length) {
			return
		}

		const reader = new FileReader();

		reader.onload = event => {
			$avaInModal.innerHTML = `<img src="${event.target.result}" alt=""/>`;
		}

		reader.readAsDataURL(this.files[0]);
	}

	function triggerInput(event) {
		event.preventDefault();
		$uploadImg.click();
	}
}

// работа с формой
/* const $form = document.getElementById('modal-cf-form');
$form.addEventListener('submit', submitHandler);

function submitHandler(event) {
	event.preventDefault();
	event.target.reset();

	// получаю значения из формы
	const name = $form.querySelector('[name="name"]'),
		lastName = $form.querySelector('[name="last-name"]'),
		email = $form.querySelector('[name="email"]'),
		tel = $form.querySelector('[name="tel"]'),
		text = $form.querySelector('[name="text"]');

	// получаю поля из модального окна с информацией
	const $name = document.querySelector('#js-user-name'),
		$lastName = document.querySelector('.js-last-name'),
		$email = document.querySelector('.js-email'),
		$tel = document.querySelector('.js-tel'),
		$text = document.querySelector('.js-text');


	const $card = $cardTpl.cloneNode(true);

	$card.removeAttribute('id');
	$card.removeAttribute('style');

	const $nameUser = $card.querySelector('.js-user-name');
	$nameUser.textContent = name.value;
	$cardsWrapper.insertAdjacentElement('afterbegin', $card);

	// меняю данные в модальном окне информации на значения из формы
	$name.textContent = name.value;
	$lastName.textContent = lastName.value;
	$email.textContent = email.value;
	$tel.textContent = tel.value;
	$text.textContent = text.value;
} */







