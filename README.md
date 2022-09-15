# Atomicus

just small utility functions to make working in vanilla js faster(if you like staying in JS);

an example actually is my desktop dataframe app, at it's core is controlled by these functions 

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Day 3️⃣ - 4️⃣ <a href="https://twitter.com/hashtag/100DaysOfCode?src=hash&amp;ref_src=twsrc%5Etfw">#100DaysOfCode</a> <a href="https://twitter.com/hashtag/DataScience?src=hash&amp;ref_src=twsrc%5Etfw">#DataScience</a> part 2<br><br>as for my <a href="https://twitter.com/hashtag/javascript?src=hash&amp;ref_src=twsrc%5Etfw">#javascript</a> dataframe software today I implemented another two simple functions, to replace a value in the entire df and rename a column <a href="https://t.co/08IDkI8wWX">pic.twitter.com/08IDkI8wWX</a></p>&mdash; _sk💻| looking for JavaScript developer role (@MhlunguSfundo) <a href="https://twitter.com/MhlunguSfundo/status/1569456167776321536?ref_src=twsrc%5Etfw">September 12, 2022</a></blockquote> 

so they are well tested 

## getting started 


### installation 

```cmd
npm i atomicus
npm i material-icons

```


```html
<!-- index.html  -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script type="module">
        // npm i material-icons
        import 'material-icons/iconfont/outlined.css';
     </script>
  
    <style>
          *{
       box-sizing: border-box;
       padding: 0;
       margin: 0;
       

     }
     html {
       scroll-behavior: smooth;
     }
     .tools_container{

        padding: 1em  1em;
        position:sticky;
        top: 0;
        background: var(--grey);
        width: 100%;
        display: flex;
        flex-direction: column;


   }

        .tools_container > *:nth-child(2){
          margin-top: 1em;

        }


        .Tools {
        display: flex;
        align-items: center;
        cursor: pointer;
        position: relative;

        }
    </style>
</head>

<body>
    



    <div id="app"></div>


    <script type="module" src="app.js"></script>
</body>
</html>

```


### createElement

expects an object of the following interface:


```ts
interface element {
    tag: string;
    attrs?: Record<any, any>;
    children?: Array<element | string>; // can be an object or string, or both
}

```


an object of sort 

```js
const el = {
    tag: "div",
    attrs: {
        class: "my_div"
    },
    children:[
        {
            tag: "label",
            attrs: {},
            children: ["Hello"]
        },
        "world"
    ]
}


createElement(el) // will return an actual DOM node 
```

### clearEl

remove all children nodes in the element 

```js

const app = document.getElementById("app")
clearEl(app)  // will efficiently delete all children
```


### PubSub

simply create's channels that can be subscribed too, and subscribers can be notified

```js
const Pub = new PubSub()


// args -> channel sub function -> returns an unsubcribe function

let unsub = Pub.subscribe("tools", (data)=> {
     console.log("a tool has been clicked", data)
})

            
Pub.notify("tools", {type: "tool1", data: null})



```


### full example 

// read the following code from the bottom up to make sense 

```js

// gui.js

// Pub - PubSub


const bottomC = (Pub) => ([

    {  
    
     tag: "span", 
    attrs: {
      title: "Histogram",
      class: "material-icons-outlined",
    
      onclick: () => Pub.notify('tools', "hist")
      
    },
    children: ['show_chart '] // material icon
     
    
    }, 



])




const topC = (Pub) => ( [
  {
    tag: "input",
    attrs: {
      type: "file",
      class: "inputCSV",
      id: "f",
      accept: ".csv"
    
    }

  },
  {
    tag: "div",
    attrs: {
       class: "selectDiv",
      id: "sel"
       
    },

  },
  {
    tag:"span",
    attrs: {
      class: "material-icons-outlined",
      title: "Data Shape",
      onclick: () => Pub.notify("tools", "shape")
    },
    children: ['table_view']

  },
  { tag: "span",
    attrs: {
      class: "material-icons-outlined",
      title: "Column Names",
      onclick: () => Pub.notify('tools', "cols")
      
    },
    children: ['view_column']


  },
  { tag: "span",
    attrs: {
     class: "material-icons-outlined",
     title: "drop all null rows",
     onclick: () => Pub.notify('tools', 'dropna')
    },
    children: ['error']

  },
  {
     tag: "span", 
     attrs:{
          class: "material-icons-outlined",
          title: "drop columns and rows",
          onclick: () => Pub.notify("tools", "drop")

     },
     children: ["arrow_drop_down_circle"]



  },
  {
    tag: "span",
    attrs: {
      class: "material-icons-outlined",
     title: "Unique values",
      onclick: () => Pub.notify('tools', 'unique')
      
    },
    children: ['dataset']
  },
  {
    tag: "span",
    attrs: {
      class: "material-icons-outlined",
     title: "Value Counter",
      onclick: () => Pub.notify('tools', 'counter')
      
    },
    children: ['123']
  },
  {
    tag: "span",
    attrs: {
      class: "material-icons-outlined",
     title: "Replace value",
      onclick: () => Pub.notify('tools', 'replace')
      
    },
    children: ['find_replace']
  },
  {
    tag: "span",
    attrs: {
      class: "material-icons-outlined",
     title: "Rename Column",
      onclick: () => Pub.notify('tools', 'rename')
      
    },
    children: ['drive_file_rename_outline']
  },
  {tag: "span",
   attrs: {
     class: "material-icons-outlined",
    title: "clear workspace",
     onclick: () => Pub.notify('tools', 'reset')
     
   },
   children: ['restart_alt']

  },

])


const topTools = (Pub) => ( {
  tag: "div",
  attrs: {
   class: "Tools"
  },
  children: topC(Pub)

})

const bottomTools = (Pub) => ({
    tag: "div", 
    attrs: {
       class: "Tools"
    
    },
    children: bottomC(Pub)

})



export const tools = (Pub) =>{

  return {
  tag: "div",
  attrs: {
    class: "tools_container"
  },
  children: [
    topTools(Pub),
    bottomTools(Pub)
  ]


 }
}

```


```js
 
 // app.js 

import {createElement, clearEl, PubSub} from "atomicus"
import { tools } from "./gui"




const cache = {}  // cache created to reduce recreating on page change and back

const app = document.getElementById("app")
const Pub = new PubSub()


clearEl(app) // making sure the el is clean
cache['GUITools'] = createElement(tools(Pub))

app.appendChild(cache['GUITools'])


// the gui will notify this 
Pub.subscribe("tools", (data)=> {
     console.log("a tool has been clicked", data)
})





```




## why do this?

well for one you have the full power of js(Objects) you can do some neat tricks before creating elements,
loop over elements easily, fetch data and create reusable stateful elements etc.