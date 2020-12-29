export class TodoList {
    constructor () {
        this.list = [];
    }

    addAnItem = (td) => {
        this.list.push(td);
    }

    removeAnItem = (itemIndex) => {
        this.list.splice(itemIndex, 1);
    }

    renderList = (renderID) => {
        let content = document.querySelector(renderID);
        content.innerHTML = '';
        content.innerHTML = this.list.reduceRight((res, item, index) => {
            res += `
                <li>
                    <span>${item.content}</span>
                    <div class="buttons">
                        <button class="remove" data-index="${index}" data-status="${item.status}" onclick="deleteItem(event)">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" data-index="${index}" data-status="${item.status}" onclick="changeItemStatus(event)">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>
                </li>
            `;
            return res;
        }, '');
    }

    sortList = (isDES) => {
        this.list.sort((item, nextItem) => {
            let textA = item.content.toLowerCase();
            let textB = nextItem.content.toLowerCase();

            return textB.localeCompare(textA);
        });
        if (isDES) {
            this.list.reverse();
        }
    }
}