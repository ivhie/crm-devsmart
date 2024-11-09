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
        $clients = $clients->orderBy('created_at', 'desc');
        $clients = $clients->get();
        //return json_encode(array('data'=>$clients,'menu'=>'clients'));
        return response()->json([
            'menu' => array('link'=>'clients'),
            'data' => $clients,
        ]);
  
  }
  
    public function new($id=null){
            /*
            $page = array(
                'menu'=>'bidding',
                'subtitle'=>'Bidding Entry',
            );
            if($id){
                $bidding = Bidding::find( $id );
                $page['bidding'] = $bidding;
                $page['subtitle'] = 'Edit Bidding Entry';
            
            }
            
            return view('admin.bidding-new')->with('page',$page);
            */

      }
      

    

      public function delete($id) {
		  /*
        $bidder =  Bidding::find($id);
        $bidder->status = 'deleted';
         if($bidder->save()) {
               echo json_encode(["msg"=>'success']);
          } else {
                echo json_encode(["msg"=>'failed']);
         }*/
            
      }

      
    

      public function store(Request $request) {
            
             /*
            $validate = Validator::make($request->all(), [
                'acct_id' => 'required',
                'lot_id' => 'required',
                'bid_amt' => 'required',
            
            ],[
                'acct_id.required' => 'Shopify User ID is required',
                'lot_id.required' => 'Lot ID is required',
                'bid_amt.required' => 'Bidding ammount is required',
               
              
                
            ]);
            if($validate->fails()){
                return back()->withErrors($validate->errors())->withInput();
            }



            if(request()->id){
              //update
              $item = Bidding::find(request()->id);
              $message = 'Bidding  edited successfully!';
            } else {
              //create
              $item = new Bidding();
              $message = 'Bidding  added successfully!';
             
            }

              
            //check if latest input big is higher than old bid
            $bid = DB::table('bidding')
            ->where('lot_id', request()->lot_id)
            //->where('bid_amt','<',request()->bid_amt)
            ->select(
                'bid_amt',
                'id'
            )
            ->latest()
            ->first();

            //if( request()->bid_amt > $bid->bid_amt ){

                $item->acct_id = request()->acct_id;
                $item->lot_id = request()->lot_id;
                $item->bid_amt = request()->bid_amt;
                $item->submitedfrom = isset(request()->submitedfrom)?request()->submitedfrom:'';


            //}
            $bid_amt = 0;
            $hightbid  = 99;
            if($bid){
               
                $bid_amt = $bid->bid_amt;
                $hightbid = $hightbid + $bid_amt;
               
               
            }


            $auction = DB::table('auction_items')
                ->where('watch_lot_id', request()->lot_id)
                ->select(
                    'id',
                    'watch_lot_id',
                    'reserves',
                    'bidding_title',
                    'product_url',
                    'owner_user_id',
                    'bidding_date'
                )
                ->where('status', '!=', 'deleted')
                ->first();

          
          //  $hightbid =  $bid_amt + 99;
           
            if( request()->bid_amt > $bid_amt && $item->save() ){ // success


                if(request()->auction_stat == 'post' ){
                        //sending email
                        //send email using template 5
                        $bidder_id =  Bidders::where('acct_id',$auction->owner_user_id)->first()->id;
                        $bidder = Bidders::find($bidder_id);
                        $response['shopify_product_url'] = 'https://'.env("SHOPIFY_SHOP_DOMAIN").'/products/'.$auction->product_url; 
                        
                        $originalDate = $auction->bidding_date;
                        // Unix time = 1685491200
                        $unixTime = strtotime($originalDate);
                        // Pass the new date format as a string and the original date in Unix time
                        $newDate = date("F j, Y", $unixTime);
                        // echo $newDate;

                        $email = array(
                            'email_code'=>'5',
                            'seller_name'=>$bidder->name,
                            'seller_email'=>$bidder->email,
                            'lot_highest_bid_price'=>request()->bid_amt,
                            'lot_number'=>request()->lot_id,
                            'lot_name'=>$auction->bidding_title,
                            'lot_sold_price'=>$auction->reserves,
                            'lot_ending_time'=>$newDate,
                            'here'=>'<a style="text-decoration:underline;" href="'.$response['shopify_product_url'].'" target="_blank">here</a>',
                            
                        );
                        $this->sendingEmail->html_bidder_email($email);
                        $this->sendingEmail->html_admin_email($email);

                }


                if(request()->auction_stat == 'live' ){
                    //sending email
                    //send email using template 11
                    $bidder_id =  Bidders::where('acct_id',request()->acct_id)->first()->id;
                    $bidder = Bidders::find($bidder_id);

                    $response['shopify_product_url'] = 'https://'.env("SHOPIFY_SHOP_DOMAIN").'/products/'.$auction->product_url; 
                    
                    $originalDate = $auction->bidding_date;
                    // Unix time = 1685491200
                    $unixTime = strtotime($originalDate);
                    // Pass the new date format as a string and the original date in Unix time
                    $newDate = date("F j, Y", $unixTime);
                    // echo $newDate;

                    $email = array(
                        'email_code'=>'11',
                        'seller_name'=>$bidder->name,
                        'buyer_name'=>$bidder->name,
                        'seller_email'=>$bidder->email,
                        'lot_highest_bid_price'=>request()->bid_amt,
                        'lot_number'=>request()->lot_id,
                        'lot_name'=>$auction->bidding_title,
                        'lot_sold_price'=>$auction->reserves,
                        'lot_ending_time'=>$newDate,
                        'auction_end_time'=>$newDate,
                        'bid_place_time'=>date("F j, Y H:i:s"),
                        'here'=>'<a style="text-decoration:underline;" href="'.$response['shopify_product_url'].'" target="_blank">here</a>',
                        
                    );
                   

            }
                       






                if(request()->submitedfrom == 'laravel'){ //submitted from laravel
                    return redirect('/bidding')->with('added', $message);
                } else {
                    //submitted from shopify
                    echo json_encode(["status"=>'success','msg'=>$message,'biddata'=>$bid]);
                    //return response()->json( array("status"=>'success','msg'=>$message) );
                }

            } else { // failed
               
                
                if(request()->submitedfrom == 'laravel'){ //submitted from laravel
                    return redirect('/bidding')->with('failed', 'New item failed to add!');
                } else {
                    //submitted from shopify
                    echo json_encode(["status"=>'failed','msg'=>'Please bid $'.$hightbid.' or aboved','biddata'=>$bid]);
                    //return response()->json( array("status"=>'failed','msg'=>'Bid amount is lower than current bid') );
                }

            }
                */
            

      }
      
   


    public function index(){
    
            $page = array(
                'menu'=>'clients',
            );
        //var_dump($products);
        //return view('admin.bidding')->with('page',$page);

    }

}
