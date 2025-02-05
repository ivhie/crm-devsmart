<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use App\Models\Clients;


class ProspectsController extends Controller
{
    
    public function get2(){
        $clients = Clients::select('*');
        $clients = $clients->where('is_deleted','=','no');
        $clients = $clients->where('clientype','=','prospect');
        $clients = $clients->orderBy('created_at', 'desc');
        $clients = $clients->get();
        //return json_encode(array('data'=>$clients,'menu'=>'clients'));

        $data = array();
        if ($clients)
		{
		      
              foreach($clients as $k=>$client) {
               
			 $btn = '<a class="btn btn-info"  href="/prospects/'.$client->id.'"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</a>&nbsp;<a class="btn  btn-danger btn-md btn-delete"  data-id="'.$client->id.'"  onClick="{ev => onDeleteClick('.$client->id.')}"><i class="fa fa-trash" aria-hidden="true"></i> Delete</a>';
				
				/*
                array_push($data,array(
						'id'=>$client->id,
						'status'=>$client->status,
                        'full_name'=>$client->full_name,
                        'email'=>$client->email,
                        'phone'=>$client->phone,
                        'company'=>$client->company,
                        'fb_link'=>$client->fb_link,
                        'website_link'=>$client->website_link,
                        'comments'=>$client->comments,
                        //date('m/d/Y h:i A', strtotime($bid->created_at)),
                        //isset($bid->bid_status)?$bid->bid_status:'-',
						'action'=>$btn,
						
				));
                */

                if($client->fb_link){

                    $client->fb_link = '<a href="'.$client->fb_link.'" target="_blank">FB Link</a>';
                }

                array_push($data,array(
                        $client->id,
                        ucfirst($client->status),
                        $client->full_name,
                        $client->email,
                        $client->phone,
                        $client->company,
                        $client->fb_link,
                        $client->website_link,
                        $client->comments,
                        //date('m/d/Y h:i A', strtotime($bid->created_at)),
                        //isset($bid->bid_status)?$bid->bid_status:'-',
                        $btn,
                        
                ));

              }
			  
              
		}


        //return  $data;
       
        return response()->json([
            'menu' => array('link'=>'prospect'),
            'data' => $data,
        ]);
  
  }


    public function get(){
        $clients = Clients::select('*');
        $clients = $clients->where('is_deleted','=','no');
        $clients = $clients->where('clientype','=','prospect');
        $clients = $clients->orderBy('created_at', 'desc');
        $clients = $clients->get();
        //return json_encode(array('data'=>$clients,'menu'=>'clients'));
        return response()->json([
            'menu' => array('link'=>'prospect'),
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
               echo json_encode(["msg"=>'Prospect successfully deleted! ']);
          } else {
                echo json_encode(["msg"=>'Prospect failed to delete.']);
         }
         
      }

      
    

      public function store(Request $request) {
            
            $validate = $request->validate(
                [ 'full_name' => ['required', 'max:105'],'clientype' => ['required']  ],
                [ 'full_name.required' => 'Contact name is required', 'clientype.required' => 'Please select client type!']
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
            $prospect->fb_link = request()->fb_link;
            $prospect->website_link = request()->website_link;
            $prospect->status = request()->status;
            $prospect->comments = request()->comments;
            $prospect->clientype = request()->clientype;
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
