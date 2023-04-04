let container=document.createElement("div");
let head=document.createElement("div");
head.className=("head");
let h1=document.createElement("h1");
let h11=document.createElement("h1");
h11.className="ice";
h1.innerHTML=" and Fire";
h11.innerHTML="Ice"
head.append(h11,h1);
container.setAttribute("class","container");
let row=document.createElement("div");
row.setAttribute("class","row");
row.innerText="loading.....";
container.append(row);


async function foo(start,end){
    row.innerHTML="";
    for(let i=start;i<=end;i++){
        try{
        
            let res=await fetch(`https://www.anapioficeandfire.com/api/books/${i}`);
            let res1=await res.json();
            // console.log(res1);
        
        
            //fetch characters
            async function characters(){
                let arr=[];
                let count=0;
                while(arr.length<5){
                let result=await fetch(res1.characters[count]);
                let result1=await result.json();
                if(result1.name.length>0){
                arr.push(result1.name);
                    }
                    count++;
                }
                return arr;
            }
    
    
    
            let x=await characters();//store as array
    
        
            //return authors array
            function authors(){
                let len=res1.authors.length;
                let aut=[];
                for(let i=0;i<len;i++){
                    aut.push(res1.authors[i]);
                }
                return aut;
            }



            //getDATE
            function date(){
                let d= new Date(res1.released);
                let monthn=d.toLocaleString(`default`,{month:`short`});
                d=`${d.getDate()} / ${monthn} / ${d.getFullYear()}`;
                return d;
            }
        
          

            
            //display it
            let col=document.createElement("div");
            col.setAttribute("class","col-md-6");
            col.innerHTML+=`
            
<table class="table table-striped table-dark" >
  <thead>
    <tr>
      <th scope="col">  Book Name</th>
      <th scope="col" style="color:tomato;"><h4>${res1.name}</h4></th>
   
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">ISBN</th>
      <td>${res1.isbn}</td>
    
    </tr>
    <tr>
      <th scope="row">Number Of Pages</th>
      <td>${res1.numberOfPages}</td>
    
    </tr>
    <tr>
      <th scope="row">Authors</th>
      <td>${ authors()}</td>
     
    </tr>
    <tr>
      <th scope="row">Publisher</th>
      <td>${res1.publisher}</td>
     
    </tr>
    <tr>
      <th scope="row">Release Date</th>
      <td>${date()}</td>
     
    </tr>
    <tr>
      <th scope="row">Characters</th>
      <td>
      
      <ol>
      <li>${x[0]}</li>
      <li>${x[1]}</li>
      <li>${x[2]}</li>
      <li>${x[3]}</li>
      <li>${x[4]}</li>
      </ol>
      
      </td>

     
     
    </tr>
  </tbody>
</table>
            
            `;
            row.append(col);



        }
        catch(error){
            console.log(error);
        }
        
    }    
}

foo(1,2);//default value when page is load without any event

//pagination 
let row1=document.createElement("div")
row1.classList.add("row");
let div=document.createElement("div");
div.classList.add("col");
div.innerHTML=`
<div id="nav" class="bg-dark text-white">
        <div class="in_nav" onclick="foo(1,2)">1</div>
        <div class="in_nav" onclick="foo(3,4)">2</div>
        <div class="in_nav" onclick="foo(5,6)">3</div>
        <div class="in_nav" onclick="foo(7,8)">4</div>
        <div class="in_nav" onclick="foo(9,10)">5</div>
    </div>
`;
row1.append(div);
container.append(row1)
document.body.append(head,container);
