//Basics

//************************* Event Listeners *************************************//

function activate_event_handlers() {
  try {
    const parent_filter = document.getElementById("main_filter_id");
    const child_filters = parent_filter.children;
    console.log(child_filters);

    for (const child of child_filters) {
      let child_id = child.id.toString();
      const filter_entry = document.getElementById(child_id);
      let filter_list = [];

      if (child_id.includes("party")) {
        filter_list = party_list;
      } else if (child_id.includes("state")) {
        filter_list = state_list;
      } else if (child_id.includes("rank")) {
        filter_list = rank_list;
      }
      console.log(filter_list);
      filter_entry.addEventListener("mouseenter", function () {
        let filters = "<ul style='padding:0px;margin:0px;'>";
        const filter_id = document.getElementById(child.children[1].id);
        for (let index = 0; index < filter_list.length; index++) {
          filters +=
            '<li onclick="main_filter_function(&quot;' +
            filter_list[index] +
            "&quot;, &quot;" +
            child.children[0].id +
            '&quot;)" class="filter_list_class">' +
            filter_list[index] +
            "</li>";
        }
        filter_id.innerHTML = filters + "</ul>";
      });

      filter_entry.addEventListener("mouseleave", function () {
        console.log("Leave");
        const filter_id = document.getElementById(child.children[1].id);
        filter_id.innerHTML = "";
      });
    }
  } catch (error) {
    // Code to handle the exception
    console.error("Function - activate_event_handlers:", error.message);
  }
}

document.addEventListener("click", function () {
  for (let index = 0; index < 3; index++) {
    const main_filter = document.getElementById("main_filter_id");
    const filter_id = main_filter.children[index].children[1];
    filter_id.innerHTML = "";
  }
});
//***************************** CSS Animations *************************************//

function hamburger_animation() {
  try {
    const hamburger_tag = document.getElementById("hamburger_img");
    const nav_tag_class = document.getElementsByClassName("nav_bar_links")[0];
    hamburger_tag.onclick = function () {
      if (nav_tag_class.classList.contains("remove_tag")) {
        nav_tag_class.classList.remove("remove_tag");
      } else {
        nav_tag_class.classList.add("remove_tag");
      }
    };
  } catch (error) {
    // Code to handle the exception
    console.error("Function - hamburger_animation:", error.message);
  }
}

function video_play_pause() {
  try {
    const video_tag = document.getElementById("intro_video_tag");
    video_tag.addEventListener("click", function () {
      if (video_tag.paused) {
        video_tag.play();
      } else {
        video_tag.pause();
      }
    });
  } catch (error) {
    // Code to handle the exception
    console.error("Function - video_play_pause:", error.message);
  }
}

// Shake Animation For The Cards

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let shakes = 0;
async function shake_animation_add() {
  try {
    let index = 1;
    let cards = document.querySelectorAll(".container");
    // console.log(cards)
    for (const card of cards) {
      await sleep(index * 200);
      card.classList.add("shake");
      setTimeout(() => card.classList.remove("shake"), 1000);
      index = index + 1;
    }
    shakes++;
    if (shakes == 5) {
      clearInterval(shake_the_cards);
    }
  } catch (error) {
    // Code to handle the exception
    console.error("Function - shake_animation_add:", error.message);
  }
}

function add_element_to_view(element) {
  try {
    scrollToTop();
    const main_id = document.getElementById("main_id");
    const selected_tab = element.children[0].textContent.toString().trim();
    if (selected_tab == "Home") {
      for (const min_id of main_id.children) {
        min_id.classList.remove("remove_tag");
      }
    } else if (selected_tab == "Party") {
      for (const min_id of main_id.children) {
        min_id.classList.add("remove_tag");
        if (min_id.id.toString().includes("Total_Party_Section")) {
          min_id.classList.remove("remove_tag");
        }
      }
    } else if (selected_tab == "Leaders") {
      for (const min_id of main_id.children) {
        min_id.classList.add("remove_tag");
        if (min_id.id.toString().includes("Leadership_Role_Section")) {
          min_id.classList.remove("remove_tag");
        }
      }
    } else if (selected_tab == "Senators") {
      for (const min_id of main_id.children) {
        min_id.classList.add("remove_tag");
        if (min_id.id.toString().includes("Senator_Table_Section")) {
          min_id.classList.remove("remove_tag");
        }
      }
    } else if (selected_tab == "About") {
      for (const min_id of main_id.children) {
        min_id.classList.add("remove_tag");
        if (min_id.id.toString().includes("About_Section")) {
          min_id.classList.remove("remove_tag");
        }
      }
    }
    popup.classList.remove("remove_tag")
    popup_bg.classList.add("remove_tag");
  } catch (error) {
    // Code to handle the exception
    console.error("Function - add_element_to_view:", error.message);
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

//Every 5 seconds the cards shake for 5 times
const shake_the_cards = setInterval(shake_animation_add, 5000);

//***************************** TASKS *************************************//

// Function to get data from JSON
function get_data_from_JSON() {
  try {
    fetch("./Json/senators.json", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        //Filter Out Useless Data
        filter_json_object_list(data.objects);

        // Display the total party memebers on the webpage - Task 1
        get_total_party_count();

        // Display the party leader memeber on the webpage - Task 2
        get_list_of_all_leaders_with_party();

        // Populate the senator table for 1-10 at a time - Task 3
        populate_filters(senators_object_list);
        filter_with_filters();
      })
      .catch((error) => {
        console.error("Error fetching JSON:", error);
      });
  } catch (error) {
    // Code to handle the exception
    console.error("Function - get_data_from_JSON:", error.message);
  }
}

// Function to filter out useful data from useless ones
function filter_json_object_list(json_list) {
  try {
    for (let index = 0; index < json_list.length; index++) {
      let name =
        json_list[index].person["firstname"] +
        " " +
        json_list[index].person["lastname"];
      let party = json_list[index].party;
      let state = json_list[index].state;
      let gender = json_list[index].person["gender_label"];
      let rank = json_list[index].senator_rank_label;
      let leadership_title = json_list[index].leadership_title;
      let office = json_list[index].extra["office"];
      let dob = json_list[index].person["birthday"];
      let startdate = json_list[index].startdate;
      let twitterid = json_list[index].person["twitterid"];
      let youtubeid = json_list[index].person["youtubeid"];
      let senatorlink = json_list[index].person["link"];
      let photo =
        "https://www.govtrack.us/static/legislator-photos/" +
        senatorlink.toString().slice(-6) +
        "-200px.jpeg";
      let json_object =
        '{"name":"' +
        name +
        '", "party":"' +
        party +
        '", "state":"' +
        state +
        '", "gender":"' +
        gender +
        '", "rank":"' +
        rank +
        '", "leadership":"' +
        leadership_title +
        '", "office":"' +
        office +
        '", "dob":"' +
        dob +
        '", "startdate":"' +
        startdate +
        '", "twitterlink":"' +
        twitterid +
        '", "youtubelink":"' +
        youtubeid +
        '", "senatorlink":"' +
        senatorlink +
        '", "photo":"' +
        photo +
        '"}';
      senators_object_list.push(JSON.parse(json_object));
    }
  } catch (error) {
    // Code to handle the exception
    console.error("Function - filter_json_object_list:", error.message);
  }
}

//TASK 1

// Function to get total count of each party
function get_total_party_count() {
  try {
    total_rep = 0;
    total_demo = 0;
    total_ind = 0;

    for (let index = 0; index < senators_object_list.length; index++) {
      if (senators_object_list[index].party == republic) {
        total_rep += 1;
      }
      if (senators_object_list[index].party == democrat) {
        total_demo += 1;
      }
      if (senators_object_list[index].party == independent) {
        total_ind += 1;
      }
    }
    document.getElementById("total_rep").innerHTML = total_rep + "%";
    document.getElementById("total_demo").innerHTML = total_demo + "%";
    document.getElementById("total_indep").innerHTML = total_ind + "%";
  } catch (error) {
    // Code to handle the exception
    console.error("Function - get_total_party_count:", error.message);
  }
}

//TASK 2

// Function to get the list of all the leaders with repect to a party
function get_list_of_all_leaders_with_party() {
  try {
    list_of_demo = "";
    list_of_rep = "";
    list_of_indep = "";
    for (let i = 0; i < senators_object_list.length; i++) {
      if (senators_object_list[i].leadership != "null") {
        if (senators_object_list[i].party == democrat) {
          list_of_demo +=
            "<li id='leaders_id'><b>" +
            senators_object_list[i].leadership +
            "</b> : <br>" +
            senators_object_list[i].name +
            " (" +
            democrat +
            ")" +
            "</li>";
        }

        if (senators_object_list[i].party == republic) {
          list_of_rep +=
            "<li id='leaders_id'><b>" +
            senators_object_list[i].leadership +
            "</b> <br> " +
            senators_object_list[i].name +
            " (" +
            republic +
            ")" +
            "</li>";
        }
      }
    }

    document.getElementById("list_of_demo_leaders").innerHTML = list_of_demo;
    document.getElementById("list_of_rep_leaders").innerHTML = list_of_rep;
    // document.getElementById("list_of_indep_leaders").innerHTML = list_of_indep;
  } catch (error) {
    // Code to handle the exception
    console.error(
      "Function - get_list_of_all_leaders_with_party:",
      error.message
    );
  }
}

//TASK 3

const male_profile =
  '<img src="../Images/male_profile.png" style="min-height:55%; max-height:75%; max-width:70%;"></img>';
const female_profile =
  '<img src="../Images/female_profile.png" style="min-height:55%; max-height:75%; max-width:70%;"></img>';

const male_gender =
  '<img src="../Images/male_icon.png" style="width:50%;"></img>';
const female_gender =
  '<img src="../Images/female_icon.png" style="width:50%;"></img>';

const democrat_icon =
  '<img src="../Images/democratic_logo.png" style="width:65%;"></img>';
const republic_icon =
  '<img src="../Images/republican_logo.png" style="width:70%;"></img>';
const indep_icon =
  '<img src="../Images/independent_party_logo.png" style="width:65%;"></img>';

function generate_images(gender, party) {
  let profile_image = gender == "Male" ? male_profile : female_profile;
  let gender_image = gender == "Male" ? male_gender : female_gender;

  let party_image = "";
  switch (party) {
    case democrat:
      party_image = democrat_icon;
      break;
    case republic:
      party_image = republic_icon;
      break;
    case independent:
      party_image = indep_icon;
      break;
    default:
      break;
  }

  return [profile_image, gender_image, party_image];
}

let main_filter_list = [];

function filter_with_filters() {
  try {
    let filter_by = ["party", "state", "rank"];
    let filter_list = [];
    for (filter of filter_by) {
      let query =
        "#filter_" +
        filter.toString() +
        "_id #filter_" +
        filter.toString() +
        "_input";
      let filter_input = document.querySelector(query).placeholder;
      if (
        filter_input != "Party" &&
        filter_input != "State" &&
        filter_input != "Rank"
      ) {
        filter_list.push(filter_input);
      } else {
        filter_list.push("All");
      }
    }
    main_filter_list = filter_list;
    populate_senator_table(0);
  } catch (error) {
    // Code to handle the exception
    console.error("Function - filter_with_filters:", error.message);
  }
}

//Function to filter by individual candidates
function candidate_filter_function(filtered_list) {
  try {
    filtered_list = filtered_list.filter(function (row) {
      const party_filter = main_filter_list[0];
      if (party_filter == "All") {
        return row.party;
      } else if (row.party == main_filter_list[0]) {
        return row.party;
      }
    });
    filtered_list = filtered_list.filter(function (row) {
      const party_filter = main_filter_list[1];
      if (party_filter == "All") {
        return row.state;
      } else if (row.state == main_filter_list[1]) {
        return row.state;
      }
    });
    filtered_list = filtered_list.filter(function (row) {
      const party_filter = main_filter_list[2];
      if (party_filter == "All") {
        return row.rank;
      } else if (row.rank == main_filter_list[2]) {
        return row.rank;
      }
    });
    return filtered_list;
  } catch (error) {
    // Code to handle the exception
    console.error("Function - filter_with_filters:", error.message);
  }
}

// Function to return a list of senators
function populate_senator_table(button_index) {
  try {
    //Filter by Party as default
    let filtered_list = [];
    let democrat_list = [];
    let republic_list = [];
    let indep_list = [];
    democrat_list = senators_object_list.filter(
      (items) => items.party == democrat
    );
    republic_list = senators_object_list.filter(
      (items) => items.party == republic
    );
    indep_list = senators_object_list.filter(
      (items) => items.party == independent
    );
    filtered_list = [...democrat_list, ...republic_list, ...indep_list];
    filtered_list = candidate_filter_function(filtered_list);
    let buttons = Math.round(filtered_list.length / 10);
    populate_button_list(buttons);
    // }
    let html_senators_list = "";
    populate_filters(filtered_list);
    const index_start = button_index * 10;
    const index_end = index_start + 10;
    for (
      let i = index_start;
      i < index_end && filtered_list[i] != undefined;
      i++
    ) {
      let sn_no = (i + 1).toString();
      let name = filtered_list[i].name;
      let party = filtered_list[i].party;
      let state = filtered_list[i].state;
      let gender = filtered_list[i].gender;
      let rank = filtered_list[i].rank;

      const [profile_image, gender_image, party_image] = generate_images(
        gender,
        party
      );
      html_senators_list +=
        '<div class="cell" style="padding-top:60%;">' + sn_no + "</div>";
      html_senators_list +=
        '<div class="profile_cell" onclick="display_detils_popup(this)">' +
        profile_image +
        "<p>" +
        name +
        "</p></div>";
      html_senators_list +=
        '<div class="cell">' + party_image + "<p>" + party + "</p></div>";
      html_senators_list +=
        '<div class="cell" style="padding-top:40%;">' + state + "</div>";
      html_senators_list +=
        '<div class="cell">' + gender_image + "<p>" + gender + "</p></div>";
      html_senators_list +=
        '<div class="cell" style="padding-top:40%;">' + rank + "</div>";
    }
    var element = document.getElementById("senators_list_id");
    element.innerHTML = "";
    element.innerHTML = html_total_senators_list + html_senators_list;
  } catch (error) {
    // Code to handle the exception
    console.error("Function - populate_senator_table:", error.message);
  }
}

const popup = document.getElementById("popupid");
const popup_bg = document.getElementById("popup_background");

async function close_popup() {
  popup.classList.remove("animate_popup_in");
  popup.classList.add("animate_popup_out");
  popup_bg.classList.add("remove_tag");
  await sleep(400);
  popup.close();
}

function display_detils_popup(main_element) {
  try {
    console.log(senators_object_list);
    const selectedname = main_element.children[1].textContent;
    const nameid = document.getElementById("name_id");
    const officeid = document.getElementById("office_id");
    const dobid = document.getElementById("dob_id");
    const startdateid = document.getElementById("startdate_id");
    const youtubeid = document.getElementById("youtube_id");
    const twitterid = document.getElementById("twitter_id");
    const linkid = document.getElementById("link_id");
    const photo = document.getElementById("photo_id");
    popup_bg.classList.remove("remove_tag");
    popup.show();
    popup.classList.remove("animate_popup_out");
    popup.classList.add("animate_popup_in");
    for (senator of senators_object_list) {
      if (senator.name == selectedname) {
        photo.src =
          senator.gender == "Male"
            ? "../Images/male_profile.png"
            : "../Images/female_profile.png";
        nameid.textContent = senator.name;
        officeid.textContent = senator.office;
        const senator_startdate = senator.startdate.toString().split("-");
        startdateid.textContent =
          senator_startdate[2] +
          "/" +
          senator_startdate[1] +
          "/" +
          senator_startdate[2];
        const dob_split = senator.dob.toString().split("-");
        dobid.textContent =
          dob_split[2] + "/" + dob_split[1] + "/" + dob_split[2];
        youtubeid.href = "https://www.youtube.com/@" + senator.youtubelink;
        twitterid.href = "https://twitter.com/" + senator.twitterlink;
        linkid.href = senator.senatorlink;
        photo.src = senator.photo;
      }
    }
  } catch (error) {
    // Code to handle the exception
    console.error("Function - display_detils_popup:", error.message);
  }
}

function populate_button_list(num_of_buttons) {
  try {
    html_button_list = "";
    for (let index = 0; index < num_of_buttons; index++) {
      html_button_list +=
        '<button class="table_button" onclick="populate_senator_table(' +
        index +
        ')" class="margin_two_px">' +
        (index + 1) +
        "</button>";
    }
    document.getElementById("button_list_id").innerHTML = html_button_list;
  } catch (error) {
    // Code to handle the exception
    console.error("Function - populate_button_list:", error.message);
  }
}

function main_filter_function(filter, filter_id) {
  try {
    let filter_head = document.getElementById(filter_id);
    if (filter == "All") {
      filter = filter_id.toString().includes("party")
        ? "Party"
        : filter_id.toString().includes("rank")
        ? "Rank"
        : filter_id.toString().includes("state")
        ? "State"
        : filter;
    }
    filter_head.placeholder = filter;
    filter_with_filters();
  } catch (error) {
    // Code to handle the exception
    console.error("Function - main_filter_function:", error.message);
  }
}

function populate_filters(filter_array) {
  try {
    const all_list = ["All"];
    party_list = [
      ...all_list,
      ...[...new Set(senators_object_list.map((obj) => obj.party))],
    ];
    // Filtering the States based on the other 2 filters
    state_list = [
      ...all_list,
      ...[...new Set(filter_array.map((obj) => obj.state))],
    ];
    rank_list = [
      ...all_list,
      ...[...new Set(senators_object_list.map((obj) => obj.rank))],
    ];
    activate_event_handlers();
  } catch (error) {
    // Code to handle the exception
    console.error("Function - populate_filters:", error.message);
  }
}

const democrat = "Democrat";
const republic = "Republican";
const independent = "Independent";
const show_all = "Show All";
const filter_list_party = [democrat, republic, independent];

const html_total_senators_list =
  '<div class="head_cell">Sl.no</div>' +
  '<div class="head_cell">Name</div>' +
  '<div class="head_cell">Party</div>' +
  '<div class="head_cell">State</div>' +
  '<div class="head_cell">Gender</div>' +
  '<div class="head_cell">Rank</div>';

let list_of_senators = "";
let senators_object_list = [];
let filtered_senators_list = [];
let party_list = [democrat, republic, independent];
let state_list = [];
let rank_list = [];

video_play_pause();
hamburger_animation();
get_data_from_JSON();
