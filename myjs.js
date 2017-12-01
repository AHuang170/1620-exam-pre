var up_keyCode = 38;
var down_keyCode = 40;
var left_keyCode = 37;
var right_keyCode = 39;
var plus_keyCode = 187;
var minu_keyCode = 189;
var enter_keyCode = 13;

var horizontal_offset = 7;
var vertical_offset = 7;

var horizontal_size_delta = 16;
var vertical_size_delta = 10;

var selected_image_id = "display_img_containter";
var current_image_num = 0;

var current_selected_num = 0;

var initialized = false;

var display_img_arr = [];

var mlink = "http://www.bcitdigitalarts.ca/vote/server/image.php";

function initialize(){
    select_image(current_selected_num);
    var default_img_obj = {
        source: document.getElementById('display_img0').src,
        title: document.getElementById('display_img_title0').innerHTML,
        id_num: 0,
        top: 0, 
        left: 0, 
        height: 400, 
        width: 640
    };
    
    display_img_arr.push(default_img_obj);
    
    initialized = true;
}

function check_keyCode(input_ev){
    console.log(input_ev.keyCode);
}

function select_image(input_num){
    var prev_selected_num = current_selected_num;
    current_selected_num = input_num;
    document.getElementById("display_img_containter"+prev_selected_num).style.borderColor = "dimgrey";
    document.getElementById("display_img_containter"+current_selected_num).style.borderColor = "aqua";
    
}

function move_img(mode){
    var img_offset = 0;
    var img_coor = 0;
    
    switch(mode){
        case "up":
            img_coor = parseInt(get_css_value(selected_image_id + current_selected_num, 'top'));
            img_offset = -1 * horizontal_offset;
            document.getElementById(selected_image_id + current_selected_num).style.top = img_coor + img_offset + 'px';
            break;
            
        case "down":
            img_coor = parseInt(get_css_value(selected_image_id + current_selected_num, 'top'));
            img_offset = 1 * horizontal_offset;
            document.getElementById(selected_image_id + current_selected_num).style.top = img_coor + img_offset + 'px';
            break;
            
        case "left":
            img_coor = parseInt(get_css_value(selected_image_id + current_selected_num, 'left'));
            img_offset = -1 * horizontal_offset;
            document.getElementById(selected_image_id + current_selected_num).style.left = img_coor + img_offset + 'px';
            break;
            
        case "right":
            img_coor = parseInt(get_css_value(selected_image_id + current_selected_num, 'left'));
            img_offset = 1 * horizontal_offset;
            document.getElementById(selected_image_id + current_selected_num).style.left = img_coor + img_offset + 'px';
            break;
            
    }
    refresh_data();
}

function resize_img(mode){
    var img_height = parseInt(get_css_value(selected_image_id + current_selected_num, 'height'));
    var img_width = parseInt(get_css_value(selected_image_id + current_selected_num, 'width'));
    var img_vert_delta = 0;
    var img_hori_delta = 0;
    
    switch(mode){
        case "plus":
            img_vert_delta = 1 * vertical_size_delta;
            img_hori_delta = 1 * horizontal_size_delta;


            break;
            
        case "minus":
            img_vert_delta = -1 * vertical_size_delta;
            img_hori_delta = -1 * horizontal_size_delta;
            
            break;
    }
    document.getElementById(selected_image_id + current_selected_num).style.height = img_height + img_vert_delta + 'px';
    document.getElementById(selected_image_id + current_selected_num).style.width = img_width + img_hori_delta + 'px';
    refresh_data();
}

function get_css_value(element_id, attribute){
    var element = document.getElementById(element_id);
    var ele_style = window.getComputedStyle(element);
    var attr_val = ele_style.getPropertyValue(attribute);
    
    return attr_val;
}

function append_new_image(entered_url, entered_title, img_top, img_left, img_height, img_width){
    if((entered_url.startsWith("http://") || entered_url.startsWith("https://"))&&(entered_url.endsWith(".jpg") || entered_url.endsWith(".png") || entered_url.endsWith(".gif")) ){
        var nDiv = document.createElement('div');
        var nTit = document.createElement('div');
        var nImg = document.createElement('img');
        var nDiv_number = 0;
        
        current_image_num += 1;
        nDiv_number = current_image_num;
        
        nDiv.id = "display_img_containter" + current_image_num;
        nDiv.className = "img_container";
        nDiv.style.position = "absolute";
        nDiv.style.top = img_top + "px";
        nDiv.style.left = img_left + "px";
        nDiv.style.height = img_height + "px";
        nDiv.style.width = img_width + "px";
        nDiv.onclick = function(){
            select_image(nDiv_number);
        };
        
        
        
        nTit.id = "display_img_title" + current_image_num;
        nTit.className = "thumb_title";
        nTit.innerHTML = entered_title;
        
        nImg.id = "display_img" + current_image_num;
        nImg.className = "display_image";
        nImg.src = entered_url;
        
        nDiv.appendChild(nImg);
        nDiv.appendChild(nTit);
        
        document.getElementById("display").appendChild(nDiv);
        
        var new_obj_source = entered_url;
        var new_obj_title = entered_title;
        var new_obj_id_num = current_image_num;
        var new_obj = {source: new_obj_source, title: new_obj_title, id_num: new_obj_id_num, top: img_top, left: img_left, height: img_height, width: img_width};
        
        for(var i = 0; i < display_img_arr.length; i++){
            if(display_img_arr[i].id_num == new_obj.id_num){
                display_img_arr.splice(i);
            }
        }
        display_img_arr.push(new_obj);
        
    }
    else{
        alert("Not a valid image");
    }
}

function display_arr_elements(){

    //console.log(display_img_arr);
    
    for(var index = 0; index < display_img_arr.length; index+=1){
        var current_obj = Object.assign({}, display_img_arr[index])
        append_new_image(current_obj.source, current_obj.title, current_obj.top, current_obj.left, current_obj.height, current_obj.with);
    }
}

function populate_display_by_arr(input_arr){
    var work_arr = input_arr.slice();
    var work_obj = {};
    current_image_num = -1;
    current_selected_num = 0;
    
    var content_panel = document.getElementById("display")
    
    while (content_panel.hasChildNodes()) {
        content_panel.removeChild(content_panel.lastChild);
    }
    
    for(var index = 0; index < work_arr.length; index += 1){
        work_obj = Object.assign({}, work_arr[index]);
        display_image(work_obj);
    }
    
}

function display_image(input_obj){
    var work_obj = Object.assign({}, input_obj);
    //console.log(work_obj);
    
    var entered_url = work_obj.source;
    var entered_title = work_obj.title;
    
    var nDiv = document.createElement('div');
    var nTit = document.createElement('div');
    var nImg = document.createElement('img');
    var nDiv_number = 0;

    current_image_num += 1;
    nDiv_number = current_image_num;

    nDiv.id = "display_img_containter" + current_image_num;
    nDiv.className = "img_container";
    nDiv.style.position = "absolute";
    nDiv.style.top = work_obj.top + 'px';
    nDiv.style.left = work_obj.left + 'px';
    nDiv.style.height = work_obj.height + 'px';
    nDiv.style.width = work_obj.width + 'px';
    nDiv.onclick = function(){
        select_image(nDiv_number);
    };

    nTit.id = "display_img_title" + current_image_num;
    nTit.className = "thumb_title";
    nTit.innerHTML = entered_title;

    nImg.id = "display_img" + current_image_num;
    nImg.className = "display_image";
    nImg.src = entered_url;

    nDiv.appendChild(nImg);
    nDiv.appendChild(nTit);

    document.getElementById("display").appendChild(nDiv);

    var new_obj_source = entered_url;
    var new_obj_title = entered_title;
    var new_obj_id_num = current_image_num;
    var new_obj = {source: entered_url, title: entered_title, id_num: nDiv_number, top: work_obj.top, left: work_obj.left, height: work_obj.height, width: work_obj.width};
    
}

function refresh_data(){
    for(index = 0; index < display_img_arr.length; index++){
        display_img_arr[index].source = document.getElementById("display_img" + display_img_arr[index].id_num).src;
        display_img_arr[index].title = document.getElementById("display_img_title" + display_img_arr[index].id_num).innerHTML;
        display_img_arr[index].top = parseInt(get_css_value(selected_image_id + display_img_arr[index].id_num, 'top'));
        display_img_arr[index].left = parseInt(get_css_value(selected_image_id + display_img_arr[index].id_num, 'left'));
        display_img_arr[index].height = parseInt(get_css_value(selected_image_id + display_img_arr[index].id_num, 'height'));
        display_img_arr[index].width = parseInt(get_css_value(selected_image_id + display_img_arr[index].id_num, 'width'));
    }
    
}

function convert_fetched_arr (input_arr){
    var work_arr = input_arr.slice();
    var output_arr = [];
    var work_obj = {};
    for(index = 0; index < work_arr.length; index++){
        work_obj = {};
        work_obj.id_num = index;
        work_obj.source = input_arr[index].msrc;
        work_obj.title = input_arr[index].mtitle;
        work_obj.top = input_arr[index].mtop;
        work_obj.left = input_arr[index].mleft;
        work_obj.height = input_arr[index].mheight;
        work_obj.width = input_arr[index].mwidth;
        output_arr.push(work_obj);
        
    }

    return output_arr;
}

function toggle_control(){
    var curr_top_coor = parseInt(get_css_value("controls", 'top'));
    
    if(curr_top_coor == 0){
        document.getElementById("controls").style.top = '-52px';
    }
    else{
        document.getElementById("controls").style.top = '0px';
    }
    
}

if(!initialized){
    initialize();
}

document.body.addEventListener("keydown", function(ev){
    //check_keyCode(ev.keyCode);
    var input_key = ev.keyCode;
    
    switch(input_key){
        case up_keyCode:
            move_img("up");
            break;
        case down_keyCode:
            move_img("down");
            break;
        case left_keyCode:
            move_img("left");
            break;
        case right_keyCode:
            move_img("right");
            break;
        case plus_keyCode:
            resize_img("plus");
            break;
        case minu_keyCode:
            resize_img("minus");
            break;
    }
});

document.getElementById("left_pointer").addEventListener("mousedown", function(){
    move_img("left");
});

document.getElementById("right_pointer").addEventListener("mousedown", function(){
    move_img("right");
});

document.getElementById("up_pointer").addEventListener("mousedown", function(){
    move_img("up");
    
});
document.getElementById("down_pointer").addEventListener("mousedown", function(){
    move_img("down");
});

document.getElementById("plus_button").addEventListener("mousedown", function(){
    resize_img("plus");
});

document.getElementById("minus_button").addEventListener("mousedown", function(){
    resize_img("minus");
});

document.getElementById("toggle_input").addEventListener("click", function(){
    toggle_control();
});

document.getElementById("toggle_input").addEventListener("mouseover", function(){
    toggle_control();
});

document.getElementById("url_input").addEventListener("keyup", function(ev){
    var entered_url = document.getElementById("url_input").value;
    if(ev.keyCode == enter_keyCode){
        var entered_url = document.getElementById("url_input").value;
        
        //if( (entered_url.includes("http") || entered_url.includes("https"))&&(entered_url.includes("jpg") || entered_url.includes("png") || entered_url.includes("gif")) )
        
        if( (entered_url.startsWith("http://") || entered_url.startsWith("https://"))&&(entered_url.endsWith(".jpg") || entered_url.endsWith(".png") || entered_url.endsWith(".gif")) ){
            document.getElementById('display_img'+current_selected_num).src = entered_url;
            refresh_data();
        }
        else{
            alert("Not a valid image");
        }
        
        
    }
});

document.getElementById("title_input").addEventListener("input", function(){
    document.getElementById("display_img_title"+current_selected_num).innerHTML = document.getElementById("title_input").value;
    refresh_data();
});

document.getElementById("new_img_button").addEventListener("click", function(){
    var entered_url = document.getElementById("url_input").value;
    var entered_title = document.getElementById("title_input").value;
    var img_top = parseInt(get_css_value(selected_image_id + current_selected_num, 'top'));
    var img_left = parseInt(get_css_value(selected_image_id + current_selected_num, 'left'));
    var img_height = parseInt(get_css_value(selected_image_id + current_selected_num, 'height'));
    var img_width = parseInt(get_css_value(selected_image_id + current_selected_num, 'width'));
    append_new_image(entered_url, entered_title, img_top, img_left, img_height, img_width);
});

document.getElementById("local_save_button").addEventListener("click", function(){
    var arrText = JSON.stringify(display_img_arr);
    console.log(arrText);
    localStorage.setItem("items", arrText);
});

document.getElementById("local_load_button").addEventListener("click", function(){
    var arrText = localStorage.getItem("items");
    var arr = JSON.parse(arrText);
    display_img_arr = [];
    if(arr != null){
        display_img_arr = arr;
    }
    
    //console.log(arr);
    //display_arr_elements();
    populate_display_by_arr(display_img_arr);
    
});

document.getElementById("online_save_button").addEventListener("click", function(){
    var mdata = new FormData();
    
    mdata.append("type", "insert");
    mdata.append("mtitle", document.getElementById("display_img_title" + current_selected_num).innerHTML);
    mdata.append("msrc", document.getElementById("display_img" + current_selected_num).src);
    mdata.append("mleft", parseInt(get_css_value(selected_image_id + current_selected_num, 'left')));
    mdata.append("mtop", parseInt(get_css_value(selected_image_id + current_selected_num, 'top')));
    mdata.append("mwidth", parseInt(get_css_value(selected_image_id + current_selected_num, 'width')));
    mdata.append("mheight", parseInt(get_css_value(selected_image_id + current_selected_num, 'height')));
    
    //console.log(mdata);
    
    fetch(mlink, {
        method: "POST",
        body:mdata
    }).then((resp)=>{
        return resp.json();
    }).then((json)=>{
        console.log(json);
    });
    
    
});

document.getElementById("online_fetch_button").addEventListener("click", function(){
    var mdata = new FormData;
    
    mdata.append("type", "read");
    
    fetch(mlink, {
        method: "POST",
        body: mdata
    }).then((resp)=>{
        return resp.json();
    }).then((json)=>{
        //console.log(json);
        display_img_arr = [];
        var arr=json.data;
        var new_arr = convert_fetched_arr(arr);
        display_img_arr = new_arr.slice();
        populate_display_by_arr(new_arr); 
    });
});