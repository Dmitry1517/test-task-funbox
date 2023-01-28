class Card {
	constructor(cards) {
		this.cards = cards;
		this.element = document.querySelector('.content__cards');
		this.render();
		this.clickCard();
		this.hoverCard();
		this.disabledCard();
	}

	render() {
		this.contentCardsBody = this.cards.map((item) => `
		  <div class="card" id="${item.id}">
		  	<div class="card__corner"></div>
		    <div class="card__wrapper">
		      <div class="card__top">
		        <div class="card__text">Сказочное заморское явство</div>
		        <h2 class="card__name">Нямушка</h2>
		        <h3 class="card__ingridient">${item.ingridient}</h3>
		        <div class="card__text">${item.portion} порций <br> ${item.present} в подарок</div>
		      </div>
		      <img src="./image/Photo.png" class="card__img" alt="Котэ">
		      <div class="card__bottom">
		        <div class="card__value">${item.weight}</div>
		        <div class="card__mass">кг</div>
		      </div>
		    </div>
		    <div class="card__info">Чего сидишь? Порадуй котэ, <span class="card__link">купи</span></div>
		  </div>                                       
		`).join(' ');
		this.element.insertAdjacentHTML('beforeend', this.contentCardsBody);
	}

	clickCard() {
		const card = this.element.querySelectorAll('.card');
		for (let select of card) {
			select.addEventListener('click', (event) => {
				if ((event.target.closest('.card__wrapper')) || (event.target.closest('.card__link'))) {
					if (select.querySelector('.card__wrapper').classList.contains('card__wrapper_selected')) {
						select.querySelector('.card__wrapper').classList.remove('card__wrapper_selected');
						select.querySelector('.card__corner').classList.remove('card__corner_selected');
						select.querySelector('.card__bottom').classList.remove('card__bottom_selected');
						let idx = cards.findIndex(i => i.id == select.id);
						select.querySelector('.card__info').innerHTML = 'Чего сидишь? Порадуй котэ, <span class="card__link">купи</span>';
						let cardText = select.querySelector('.card__text');
						cardText.innerHTML = 'Сказочное заморское явство';
						cardText.style.color = '#666666';
						cards[idx].selected = false;
					} else {
						select.querySelector('.card__wrapper').classList.add('card__wrapper_selected');
						select.querySelector('.card__corner').classList.add('card__corner_selected');
						select.querySelector('.card__bottom').classList.add('card__bottom_selected');
						let idx = cards.findIndex(i => i.id == select.id);
						let cardInfo = select.querySelector('.card__info');
						cardInfo.innerHTML = cards[idx].info;
						cards[idx].selected = true;
					}
				}
			})
		}
	}

	hoverCard() {
		const cardWrapper = this.element.querySelectorAll('.card__wrapper');
		for (let hover of cardWrapper) {
			hover.addEventListener('mouseleave', (event) => {
				let cardItem = event.target.closest('.card');
				let idx = cards.findIndex(i => i.id == cardItem.id);
				if (cards[idx].selected) {
					let cardText = hover.querySelector('.card__text');
					cardText.innerHTML = 'Котэ не одобряет?'
					cardText.style.color = '#d91667';
				}
			})
		}
	}

	disabledCard() {
		const card = this.element.querySelectorAll('.card');
		for (let dis of card) {
			let idx = cards.findIndex(i => i.id == dis.id);
			if (!cards[idx].availability) {
				dis.querySelector('.card__corner').classList.add('card__corner_disabled');
				dis.querySelector('.card__wrapper').classList.add('card__wrapper_disabled');
				dis.querySelector('.card__img').classList.add('card__img_disabled');
				dis.querySelector('.card__bottom').classList.add('card__bottom_disabled');
				dis.querySelector('.card__name').classList.add('card__name_disabled');
				dis.querySelector('.card__ingridient').classList.add('card__ingridient_disabled');
				let cardInfoDis = dis.querySelector('.card__info');
				cardInfoDis.innerHTML = `Печалька, ${cards[idx].ingridient} закончился`;
				cardInfoDis.style.color = 'yellow';
				let cardTextDis = dis.querySelectorAll('.card__text');
				for (let ctd of cardTextDis) {
					ctd.classList.add('card__text_disabled');
				}
			}
		}
	}
}

let cardsVisible = new Card(cards);



