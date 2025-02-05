<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use App\Models\Fbpages;


class FbpagesController extends Controller
{
    
    public function get(Request $request){

       /* $fbpages = Fbpages::select('*');
        $fbpages = $fbpages->where('is_deleted','=','no');
        $fbpages = $fbpages->orderBy('full_name', 'asc');
       // $fbpages = $fbpages->paginate(5);
        $fbpages = $fbpages->get();
        //$fbpages = $fbpages->paginate(5);

       // $fbpages = Fbpages::paginate(5);
       // $fbpages = $fbpages->get();
        
        //return json_encode(array('data'=>$clients,'menu'=>'clients'));
        */
        //$fbpages = Fbpages::query()->orderBy('full_name', 'asc')->paginate(10);
        $fbpages = Fbpages::query();
        //$search_this = isset($_GET['search']['value'])?$_GET['search']['value']:'';
        if ($request->has('search')) {
            $search_this = $request->input('search');
            $fbpages = $fbpages->where('full_name','like', '%'.strtolower($search_this).'%');
            $fbpages = $fbpages->orWhere('fb_link','like', '%'.strtolower($search_this).'%');
        }
        $fbpages =  $fbpages->orderBy('full_name', 'asc')->paginate(10);


        // Return Json Response
       /* return response()->json([
                'results' => $fbpages,
                'menu' => array('link'=>'fbpages'),
        ],200);*/

        return response($fbpages,200);
        /*
        return response()->json([
            'menu' => array('link'=>'fbpages'),
            'data' => $fbpages,
        ]);*/
  
  }
  
    public function getEdit($id=null){
           
            if($id){
                $fbpage = Fbpages::find( $id );
                return response()->json($fbpage);
            }
            
      }
      

    

      public function delete($id) {
		  
        $fbpage =  Fbpages::find($id);
        $fbpage->is_deleted = 'yes';
         if($fbpage->save()) {
               echo json_encode(["msg"=>'FBpage successfully deleted! ']);
          } else {
                echo json_encode(["msg"=>'FBpage failed to delete.']);
         }
            
      }

      
    

      public function store(Request $request) {
            /*
            $validate = $request->validate(
                [ 'full_name' => ['required', 'max:105'],'fb_link' => ['required','unique:fbpages']  ],
                [ 
                'full_name.required' => 'FB name is required', 
                'fb_link.required' => 'Link Required!',
                'fb_link.unique' => 'FB Link is already exist!']
            );*/

            if(request()->id){

                $validate = $request->validate(
                    [ 'full_name' => ['required', 'max:105']  ],
                    [ 
                    'full_name.required' => 'FB name is required']
                );

                //update data
                $fbpage = Fbpages::find(request()->id);
                $message = 'FBpage  edited successfully!';
            } else {

                $validate = $request->validate(
                    [ 'full_name' => ['required', 'max:105'],'fb_link' => ['required','unique:fbpages']  ],
                    [ 
                    'full_name.required' => 'FB name is required', 
                    'fb_link.required' => 'Link Required!',
                    'fb_link.unique' => 'FB Link is already exist!']
                );

                //create data
                $fbpage = new Fbpages();
                $message = 'FBpage  added successfully!';
            }
    
                
            $fbpage->full_name = request()->full_name;
            $fbpage->fb_link = request()->fb_link;
            $fbpage->comments = request()->comments;
            //$fbpage->is_deleted = 'no';
            //$fbpage->credentials = request()->credentials;
            //$fbpage->submitedfrom = isset(request()->submitedfrom)?request()->submitedfrom:'';

        
            if($fbpage->save()){ // save prospect
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
                'menu'=>'fbpages',
            );
     

    }

}
