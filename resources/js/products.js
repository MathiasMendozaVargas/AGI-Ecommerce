$(document).ready(function() {
    AOS.init({
        offset: 200,
        duration: 1000,
        delay: 800
    });

    // Prevent dropdown cart not to close when clicked
    $('.basquet-container').on('hide.bs.dropdown', function (e) {
        if (e.clickEvent) {
          e.preventDefault();
        }
    });


    const addProductBtn = $('.addProductBtn')
    const cartUL = $('.dropdown-menu')

    addProductBtn.click(function() {
        let card = $(this).parent().parent().parent().parent()
        let productName = card.children().children('h3').text()

        const procesNewLi = () => {
            var isAlready = false

            // Checking if the cart is empty and for repeated products
            if (cartUL.children().length > 1) {
                for (var i = 1; i < cartUL.children().length; i++) {
                    let currName = cartUL.children()[i].children[2].innerText

                    if (currName === productName) {
                        isAlready = true
                        break
                    } else {
                        isAlready = false
                    }
                }
            }

            // If product is not in cart
            if (isAlready === false) {
                // Get the Img Src
                let imgSrc = card.children('img').attr('src')

                // Img Element
                let imgEl = document.createElement('img')
                imgEl.setAttribute('src', imgSrc)

                // Li element
                let newLi = document.createElement('li')
                newLi.setAttribute('id', productName)


                // Create Div for amount Control
                let countControlDiv = document.createElement('div')
                countControlDiv.classList.add('amountControl')
                
                // then the button with icons
                let encreaseAmountBtn = document.createElement('a')
                encreaseAmountBtn.setAttribute('href', '#')
                encreaseAmountBtn.classList.add('addAmountIcon')
                encreaseAmountBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>'

                let decreaseAmountBtn = document.createElement('a')
                decreaseAmountBtn.setAttribute('href', '#')
                decreaseAmountBtn.classList.add('reduceAmountIcon')
                decreaseAmountBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i>'

                // Count of the product element
                let countEl = document.createElement('p')
                countEl.append('x ')
                let amountProduct = document.createElement('span')
                amountProduct.setAttribute('id', 'amountProduct')
                amountProduct.append('1')
                countEl.appendChild(amountProduct)

                // Assembling the amount control div
                countControlDiv.append(encreaseAmountBtn)
                countControlDiv.append(countEl)
                countControlDiv.append(decreaseAmountBtn)

                // Name Element
                let nameEl = document.createElement('p')
                nameEl.append(productName)

                // Current Price Element
                let currPriceEl = document.createElement('p')
                currPriceEl.append('$ ')

                let newPriceSpan = document.createElement('span')

                // Get the price of the selected product
                let selectedPrice = card.children().children()[2].children[0].children[1].innerText
                newPriceSpan.append(selectedPrice)

                currPriceEl.appendChild(newPriceSpan)


                // Append children to li & append li to ul
                newLi.appendChild(countControlDiv)
                newLi.appendChild(imgEl)
                newLi.appendChild(nameEl)
                newLi.appendChild(currPriceEl)
                console.log(newLi);

                cartUL.append(newLi)
            }

            // Encrease product quantity if product is already in cart
            else {
                let spanCount = document.getElementById(productName).children[0].children[1].children[0]
                let currAmount = parseInt(spanCount.innerText)
                let newAmount = currAmount += 1

                spanCount.innerText = newAmount
            }
        }

        // Update the subtotal
        const updateSubtotal = () => {
            if (cartUL.children().length > 1) {
                let subtotal = 0.00

                for (var i = 1; i < cartUL.children().length; i++) {
                    let price = Number(cartUL.children()[i].children[3].children[0].innerText)
                    let quantity = Number(cartUL.children()[i].children[0].children[0].innerText)

                    subtotal = subtotal + (price * quantity)
                }
                subtotal = Math.round(subtotal * 100) / 100
                $("#subtAmount")[0].innerText = subtotal
            }
        }

        // Update Cart Count Indicator
        const updateCartCount = () => {
            let globalQuantity = 0

            if (cartUL.children().length > 1) {
                for (var i = 1; i < cartUL.children().length; i++) {
                    let quantity = Number(cartUL.children()[i].children[0].children[0].innerText)

                    globalQuantity += quantity
                }
            }

            $('#cartCount')[0].innerText = globalQuantity
        }

        // Checking if "Empty Li" element exists
        // in order to remove it 
        if ($("#ifEmpty")) {
            $("#ifEmpty").remove()
            procesNewLi()
            updateCartCount()
            updateSubtotal()
        }
        // If it doesn't, we keep going...
        else {
            procesNewLi()
            updateCartCount()
            updateSubtotal()
        }
    })


    // Encreasing and reducing quantity functions will be here...
    $('.addAmountIcon').click(function() {
        console.log(this);
    })

    $('.reduceAmountIcon').click(function() {
        console.log(this);
    })
})