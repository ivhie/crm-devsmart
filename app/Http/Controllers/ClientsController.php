<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use App\Models\Clients;


class ClientsController extends Controller
{
    
    public function get(){
        $clients = Clients::select('*');
        $clients = $clients->where('is_deleted','=','no');
        $clients = $clients->where('clientype','=','client');
        $clients = $clients->orderBy('created_at', 'desc');
        $clients = $clients->get();
        //return json_encode(array('data'=>$clients,'menu'=>'clients'));
        return response()->json([
            'menu' => array('link'=>'clients'),
            'data' => $clients,
        ]);
  
  }
  
    public function getEdit($id=null){
           
            if($id){
                $client = Clients::find( $id );
                return response()->json($client);
            }
            
      }
      

    

      public function delete($id) {
		  
        $client =  Clients::find($id);
        $client->is_deleted = 'yes';
         if($client->save()) {
               echo json_encode(["msg"=>'Client successfully deleted! ']);
          } else {
                echo json_encode(["msg"=>'Client failed to delete.']);
         }
            
      }

      
    

      public function store(Request $request) {
            
            $validate = $request->validate(
                [ 'full_name' => ['required', 'max:105'],'clientype' => ['required']  ],
                [ 'full_name.required' => 'Client name is required', 'clientype.required' => 'Please select client type!']
            );

            if(request()->id){
                //update data
                $prospect = Clients::find(request()->id);
                $message = 'Prospect  edited successfully!';
            } else {
                //create data
                $prospect = new Clients();
                $message = 'Prospect  added successfully!';
            }
    
                
            $prospect->full_name = request()->full_name;
            $prospect->email = request()->email;
            $prospect->phone = request()->phone;
            $prospect->company = request()->company;
            $prospect->com_address = request()->com_address;
            //$prospect->fb_link = request()->fb_link;
            //$prospect->website_link = request()->website_link;
            $prospect->status = request()->status;
           // $prospect->comments = request()->comments;
            $prospect->clientype = request()->clientype;
            $prospect->credentials = request()->credentials;
            //$prospect->submitedfrom = isset(request()->submitedfrom)?request()->submitedfrom:'';

        
            if($prospect->save()){ // save prospect
                return response()->json([
                     'msg' => $message,
                    'status'=>'success'
                ]);
                   
            } else { // if fail added
                
                return response()->json([
                    //'data' => $clients,
                    'msg' => 'Error saving this record',
                    'status'=>'failed'
                ]);
              
            }

      }
      
   


    public function index(){
    
            $page = array(
                'menu'=>'clients',
            );
     

    }

}
