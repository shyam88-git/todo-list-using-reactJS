import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from 'primereact/checkbox';
        

const Form = () => {
  const [state, setState] = useState({ name: "" });
  const[product,setProduct]=useState([]);
  const[editIndex,setEditIndex]=useState(null);//to store the index of the item being edited..
  
   let handleSubmit=(event)=>{

        event.preventDefault();
        if(editIndex!==null){

            //update the existing item when in edit mode

             const updateProduct=[...product];//create the shadow copy of the product array
             updateProduct[editIndex]={name:state.name};
             setProduct(updateProduct);
             setEditIndex(null);



        }

        else{

            let newProduct={name:state.name};

        setProduct([...product,newProduct]);

        
        }
        setState({name:''});


   }

    let deleteItem=(index)=>{

      let updateProduct=  product.filter((item,i)=>i!==index);
        setProduct(updateProduct);


    }

    let editItem=(index)=>{


        const itemToEdit=product[index];//this lines allow to access the details of the task that you want to edit

        setState({name:itemToEdit.name});
        setEditIndex(index);

        
    }
    
    
  return (
    <React.Fragment>
      <section>
        <div className="grid">
          <div className="col-8 ">
            <h2 className="m-3">Todo List </h2>
            <Card className="m-3 shadow-5">
             
              <form onSubmit={handleSubmit}>
              <InputText
                name="name"
                value={state.name}
                onChange={(e) => setState({ ...state, name: e.target.value })}
                placeholder="Enter product name"
                className="mr-2"
              />

              <Button label="Add Task" severity="warning" />

              </form>
              <div className="mb-2">
                <table>
                  <tr>
                    <th>Task</th>
                    <th>Actions</th>

                  </tr>

                    {product.map((item,index)=>{

                        return(
                            <tr key={index}>
                            <td><Checkbox inputId={item.key} name={item.name} 

                            
                            value={item.name}/><label style={{ marginLeft: '8px' }}>{item.name}</label></td>
                            <td><Button 
                             onClick={()=>editItem(index)}
                             
                            label="Edit" severity="success" className="mr-2 " style={{ height: '30px', width: '60px' }} />
                            <Button 
                            onClick={()=>deleteItem(index)}
                            
                            label="Delete" severity="danger"style={{ height: '30px', width: '80px' }} /></td>
                        </tr>
                        )
                    })}
                </table>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Form;
