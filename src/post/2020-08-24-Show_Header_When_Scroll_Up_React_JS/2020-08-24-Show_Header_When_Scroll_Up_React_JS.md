---
slug: "Make-Header-Appear-When-Scroll-Up-React-JS"
date: '2020-08-24'
title: 'Make Header Appear When Scroll Up React JS'
category: "react js"
excerpt: 'Make header appear when page scroll up and hidden when scroll down.'
tumbnail: tumbnail.png
---

I just learning how to make header in React JS appear when you scroll up the page and hide when you scroll down. I am using `pageYOffset` to get an scroll position of page. Then we make calculate previous and current `pageYOffset`. If previous `pageYOffset` greater than current `pageYoffset` its mean you are scrolling up the page and otherwise. Next we can update the state to make an className to header from that condition. Now lets take look to following code

```js
import React, { useState, useEffect } from 'react'

const Header = () => {

  // we made a state to store previous pageYOffset
  // and state to update the header to be visible or not

  const [prevPoss, setPrevPoss] = useState(window.pageYOffset)
  const [ visible, setVisible ] = useState(true)

  // this is the function to check you scroll up or scroll down
  // and then update the state from the that conditon

  const handleHeader = () => {
    const currPos = window.pageYOffset
    const visible = prevPoss > currPos
    setVisible(visible)
    setPrevPoss(currPos)
  }

  // we use useEffect to trigger the function 
  // when the previous pageYOffset updated 
  // and then remove it

  useEffect(() => {
    window.addEventListener("scroll", handleHeader)
    return () => {
      window.removeEventListener("scroll", handleHeader)
    }
  }, [prevPoss])

  
  return (
    <>
      {/* we update header className depends on visible state */}

      <header className={visible ? "visible" : ""}>
        this is header
      </header>
      <main>
        <p>
          Ullamco sunt ut minim nostrud sunt consequat ex qui ex amet. Aliqua commodo minim enim esse. Officia laborum duis duis aute culpa dolor dolore dolor ipsum officia excepteur ad. Commodo dolore cillum esse incididunt amet Lorem. Quis elit tempor occaecat sit adipisicing ad est nostrud pariatur. Ipsum eiusmod qui dolor esse aute excepteur.
        </p>
        <p>
          Minim velit sit esse sint reprehenderit reprehenderit nulla. Do tempor magna excepteur et veniam ad amet ut Lorem non voluptate ipsum irure Lorem. Enim consequat reprehenderit aute reprehenderit ea ullamco adipisicing aliquip cillum veniam ut proident officia. Minim deserunt commodo anim laborum enim eiusmod sint duis deserunt. Lorem nisi sit consequat irure labore eiusmod laboris tempor ex adipisicing est. Irure esse aliqua quis quis qui veniam cillum ex.
        </p>
      </main>
    </>
  )
}
```

Now when you open that component, the header's className will be updated when you scroll up or scroll down. Now add css to make it better.

```css
header {
  position: fixed;
  left: 0;
  right: 0;
  top: -40px;
  height: 40px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #0e1850;
  color: white;
  transition: all 300ms ease;
}

header.visible {
  top: 0;
}

main {
  font-size: 2rem;
}
```

I make the header fixed position. To hide the header, i make the top property of header equal of -height, so the header completely hide from the screen. then when the header has visible class, we update the top property to 0. To make it better, add the animation to header. Next, we must import this style to our app. Now we can see the header will appear when we scroll up and hide when we scroll down. .