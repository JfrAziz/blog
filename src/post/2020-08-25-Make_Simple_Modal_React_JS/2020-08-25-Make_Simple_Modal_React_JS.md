---
slug: "Make-Simple-Modal-React-JS"
date: '2020-08-25'
title: 'Make Simple Modal React Js'
category: "react js"
excerpt: 'In this post, I will show you how to make a simple modal in react js. The modal I make can be closed by click in outside modal and/or in close button.'
tumbnail: tumbnail.png
---

In this post, I will show you how to make a simple modal in react js. The modal I make can be closed by click in outside modal and/or in close button. I just pass the props of function that make modal open or close from the parent component. Let's see the following code of my `Modal` component in react.

```javascript
import React from 'react'

const Modal = (props) => {
  const { open, closeModal, children } = props
  return open && (
    <div className="modal-container" onClick={closeModal}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-close-btn">
          <button onClick={closeModal}>X</button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
```

and this is style I use, just import it to your component.

```css
.modal-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #1f1f1f49;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-wrapper {
  background-color: #fff;
  box-shadow: 1px 2px 4px #33333356;
  width: 200px;
  height: 200px;
  padding: 20px;
  position: relative;
}

.modal-close-btn {
  border: none;
  outline: none;
  position: absolute;
  right: -20px;
  top: -20px;
  width: 30px;
  height: 30px;
  background-color: #1a1924;
  color: #fff;
  padding: 10px;
  border-radius: 50%;
}
```

In this modal component, `open` props make a Modal component open or not. `closeModal` is a function in parent component to close a Modal component. `children` is a anythings you want inside a modal. Modal that we wanna create is modal that can be close by click the outside of modal, so we make a `modal-container` element as a base of modal, which is `fixed` and full of width and height element. Next we create `modal-wrapper` as body of modal, but when you click the `modal-container` you will close the modal because you still click the `modal-container`. To remove it, we add a `stopPropagation` so you don't click the `modal-container`. Now we can import this modal component in parent component like this.

```javascript
import React, { useState } from 'react'
import Modal from './Modal'

const App = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <div>

      <button onClick={()=>setOpenModal(true)}>Open Modal</button>
      
      <Modal open={openModal} closeModal={()=>setOpenModal(false)}>
        <div>
          this is modal
        </div>
      </Modal>

    </div>
  )
}
```

We make a state to make a modal open and we can close it with change it. In that example, I create `openModal` state to open modal and when I wanna close the modal we just pass the function to change the `openModal` state which is `setOpenModal` to false. So we just add `Modal` component that we have created and just add props like in that code. Now you can make anythings inside the modal. Finally, you can modify the code to what you want like the `css` or anythings. I just tell you how I do it, thank you.