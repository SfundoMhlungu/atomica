export function clearEl(el: HTMLElement): void{

    while(el.firstChild){
        el.removeChild(el.firstChild)
      }
}



interface element {
    tag : string,
    attrs?: Record<any, any>,
    children?: Array<element | string>,
}



function SetAttribs(node:HTMLElement , attrs: Record<any, any>){

    for(const [key, val] of Object.entries(attrs)){
        // for some weird reason set attribute set attribute sometimes fails events
      if(key === "onclick"  || key === "onselect" ){
          node.addEventListener("click", val)
  
      }else if(key === "onchange"){
        node.addEventListener("input", val)
      }
      
      else{
        node.setAttribute(key, val)
      }
    }
  
  
  }


export function createElement(node: element): HTMLElement | Text{
    if(typeof node  == "string"){
        return document.createTextNode(node)
      }   

      const p = document.createElement(node.tag);

      
        if(node.attrs){

            SetAttribs(p, node.attrs)
        }

      node && node.children && node.children.map(createElement)
      .forEach(p.appendChild.bind(p))


      return p

}


export class PubSub{
    subscribers:Record<string, Array<Function>> = {};


    subscribe(channel: string, fn: Function){
        if(!this.subscribers[channel]){
            this.subscribers[channel] = []
         }

         
        this.subscribers[channel].push(fn);

        return () => {
           
           this.subscribers[channel] = this.subscribers[channel].filter(sf => sf !== fn)
        }
    }

    notify(channel:string, ...data: any[]){
        if(!this.subscribers[channel]) throw new Error(`${channel} does not exist`)
        this.subscribers[channel].forEach(fn => fn(...data))
     
       }
}