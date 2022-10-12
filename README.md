# FdH

FdH is a UI library that allows you to develop web apps in the declarative style,
component-based - these make your lines of code more predictable and maintainable.

If you are familiar with React before, using FdH is quite similar.
It implements some of the main ideas of React: virtual DOM, functional components, and hooks.

Writing codes with FdH is nothing but JSX and hooks.
It is aimed to be as simple as possible, while still providing an excellent development experience.
With such criteria in mind, we made it some benefits:
- Simple usage: only JSX and hooks
- Performant: significantly better memory usage, and slightly better CPU usage compared to React
- Lightweight: only 8kb (or 3kb gzipped), compared to 132kb for React

If such things are not really meaningful to your case, then let's start with React.
We created this library for our special cases that require those criteria strictly,
while the powerful supports of React ecosystem are not necessary.

## Install

Install the library:

```
npm install git+ssh://git@git.itim.vn:ads-frontend/fdH.git
```

Install Babel's packages to use JSX syntax:

```
npm install babel-loader @babel/core @babel/preset-env @babel/plugin-transform-react-jsx
```

## Configuration

### babel.config.json

```json
{
    "presets": ["@babel/preset-env"],
    "plugins": [
        ["@babel/plugin-transform-react-jsx", {
            "pragma": "jsx",
            "pragmaFrag": "'['"
        }],
    ],
}
```

### webpack.config.js

```js
module.exports = {
    //...
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: require('./babel.config.json')
                    }
                ]
            },
            //...
        ],
    },
};
```

## Usage

### Basic usage

```jsx
import {jsx, render} from 'fdH';

// Declare your component
function HelloWorld() {
    return (
        <div className="HelloWorld">
            <h1>Hello World!</h1>
        </div>
    );
}

// Render your component into a DOM element (#root)
render(<HelloWorld/>, document.getElementById('root'));
```

### useState

```jsx
import {jsx, useState} from 'fdH';

function Counter() {
    let [count, setCount] = useState(0);
    
    return (
        <div className="Counter">
            <div>Count: {count}</div>
            <div>
                <button
                    type="button"
                    onClick={() => {
                        setCount(count => count + 1);
                    }}
                />
            </div>
        </div>
    );
}
```

### useEffect

```jsx
import {jsx, useState, useEffect} from 'fdH';

function UserInfo() {
    let [email, setEmail] = useState('');
    let [info, setInfo] = useState(null);
    
    useEffect(() => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/user/info');
        xhr.onload = () => {
            setInfo(xhr.responseText);
        };
        xhr.send('email=' + email);
        
        return () => {
            xhr.abort();
        };
    }, [email]);
    
    return (
        <div className="UserInfo">
            <input
                type="text"
                onChange={ev => {
                    setEmail(ev.target.value);
                }}
            />
            {info !== null && (
                <p>{info}</p>
            )}
        </div>
    );
}
```

### useLayoutEffect

The signature is identical to `useEffect`, but it fires synchronously after all DOM mutations.
Use this to read layout from the DOM and synchronously re-render.
Updates scheduled inside `useLayoutEffect` will be flushed synchronously, before the browser has a chance to paint.

Prefer the standard `useEffect` when possible to avoid blocking visual updates.

### useRef

```jsx
import {jsx, useEffect, useRef} from 'fdH';

function Image() {
    let imageRef = useRef(null);

    useEffect(() => {
        let image = imageRef.current;

        // Do something with the native image element
        console.log(image.naturalWidth, image.naturalHeight);
    }, []);

    return (
        <img ref={imageRef} src="/path/to/image.png"/>
    );
}
```

### Forward refs

Don't like React, `ref` property can be accessed inside the component. You also don't need `forwardRef()` at all.

```jsx
import {jsx, useRef} from 'fdH';

function TextInput({ref}) {
    return (
        <input ref={ref}/>
    );
}

function App() {
    let inputRef = useRef(null);
    
    useEffect(() => {
        console.log('Input element', inputRef.current);
    }, []);

    return (
        <TextInput ref={inputRef}/>
    );
}
```

### Error boundaries

```jsx
import {jsx, useCatch} from 'fdH';

function ErrorBoundary({children}) {
    let [error, clearError] = useCatch();

    if (error !== null) {
        return 'Oops... Something went wrong!';
    }

    return children;
}
```

Error boundaries catch errors during rendering, in hook callbacks and in the whole tree below them.
Error boundaries allow only one `useCatch` inside.

### Portal

```jsx
import {jsx, createPortal} from 'fdH';

function DocumentPortal({children}) {
    let elRef = useRef(document.createElement('div'));
    elRef.current.style.display = 'contents';
    
    useEffect(() => {
        if (elRef.current.parentNode === null) {
            document.body.appendChild(elRef.current);
        }
        return () => {
            if (elRef.current.parentNode !== null) {
                elRef.current.parentNode.removeChild(elRef.current);
            }
        };
    }, []);

    return createPortal(children, elRef.current);
}

function App() {
    let [showsImage, setShowsImage] = useState(false);

    return (
        <div>
            <button onClick={() => setShowsImage(true)}>
                Show Image
            </button>
            {showsImage && (
                <DocumentPortal>
                    <div className="modal">
                        <img src="/path/to/image.png"/>
                    </div>
                </DocumentPortal>
            )}
        </div>
    );
}
```

### Store

Store is a separate package. It is helpful when we want to use some global states,
which can be read/written from anywhere in the DOM tree, with no need to pass props through all levels of elements. 

```jsx
import {jsx, useRef} from 'fdH';
import {useStoreInit, useStoreRead, useStoreWrite} from 'fdH/store';

function App() {
    useStoreInit(
        App, // Scope
        {title: 'Store usage example'} // Initial data
    );

    return (
        <main>
            <Header/>
            <section>
                <Form/>
            </section>
        </main>
    );
}

function Header() {
    let title = useStoreRead(
        App, // Scope
        (data) => data.title // Reader
    );

    return (
        <h1>{title}</h1>
    );
}

function Form() {
    let title = useStoreRead(App, (data) => data.title);
    let setTitle = useStoreWrite(
        App, // Scope
        (data, value) => data.title = value // Writer
    );

    let handleClickRef = useRef(ev => setTitle(ev.target.value));

    return (
        <input
            type="text"
            value={title}
            onChange={handleClickRef.current}
        />
    );
}
```

## Custom hooks

### useMemo and useCallback

```js
function useMemo(create, deps = null) {
    let ref = useRef({v: undefined, d: null});
    if (mismatchDeps(deps, ref.current.d)) {
        ref.current.v = create();
        ref.current.d = deps;
    }
    return ref.current.v;
}

function useCallback(callback, deps = null) {
    let ref = useRef({v: undefined, d: null});
    if (mismatchDeps(deps, ref.current.d)) {
        ref.current.v = callback;
        ref.current.d = deps;
    }
    return ref.current.v;
}

function mismatchDeps(deps, lastDeps) {
    if (deps === null) return true;
    if (deps.length === 0) return false;
    if (lastDeps === null) return true;
    if (arraysEqual(deps, lastDeps)) return false;
    return true;
}

function arraysEqual(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = a.length - 1; i >= 0; --i) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
```
