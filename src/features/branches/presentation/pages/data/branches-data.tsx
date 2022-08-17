export interface branchType {
  place: string;
  address: string;
  contact: string;
  oparationHour: string;
  addressHref: string;
  contactHref: string;
}

export interface branchesTypes {
  region: string;
  branch: Array<branchType>;
}

export const branches: Array<branchesTypes> = [
  {
    region: "NCR",
    branch: [
      //1
      {
        place: "Taters Alabang Town Center",
        address:
          "Space 116, New Entertainment Complex, Cinema Lobby, Alabang Town Center, Alabang Muntilupa City",
        contact: "09498899565",
        oparationHour: "MON - SUN (11AM - 7PM)",
        addressHref:
          "https://www.google.com/maps/place/Alabang+Town+Center+Cinemas/@14.4232499,121.0310826,17z/data=!4m8!1m2!2m1!1sSpace+116,+New+Entertainment+Complex,+Cinema+Lobby,+Alabang+Town+Center,+Alabang+Muntilupa+City!3m4!1s0x3397d1cced15d32f:0x801e98118e1946e3!8m2!3d14.4233459!4d121.0309339",
        contactHref: "tel:09498899565",
      },
      {
        place: "Taters Bel Air Makati",
        address: "78 Estrella St. Bel Air Village, Makati",
        contact: "09498897833",
        oparationHour: "MON - SUN (10AM - 6PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+Entertainment+Snacks/@14.5605174,121.0401853,3a,75y,90t/data=!3m8!1e2!3m6!1sAF1QipMZ4EBEKR04G6pOhwcD5I9rpT_tgZrEYfp8cPmd!2e10!3e12!6shttps:%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipMZ4EBEKR04G6pOhwcD5I9rpT_tgZrEYfp8cPmd%3Dw197-h86-k-no!7i2000!8i872!4m13!1m6!3m5!1s0x3397c90124083db3:0xdc4d8bd9885c256f!2sTaters+Entertainment+Snacks!8m2!3d14.5604183!4d121.0400574!3m5!1s0x3397c90124083db3:0xdc4d8bd9885c256f!8m2!3d14.5604183!4d121.0400574!15sCg90YXRlcnMgZXN0cmVsbGGSAQ1wb3Bjb3JuX3N0b3Jl",
        contactHref: "tel:09498897833",
      },
      {
        place: "Taters Better Living",
        address:
          "36 France St., Better Living, Brngy Don Bosco, Paranaque City",
        contact: "09958333228",
        oparationHour: "MON - SUN (12NN - 8PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+Better+Living/@14.4825208,121.0285411,17z/data=!3m1!4b1!4m5!3m4!1s0x3397cf5d14429ddf:0x6b5e52be47648fa7!8m2!3d14.4825156!4d121.0307298",
        contactHref: "tel:09958333228",
      },
      //2
      {
        place: "Taters BF Homes",
        address: "284 El Grande Avenue BF Homes Paranaque City",
        contact: "09567608146",
        oparationHour: "MON - THU (11AM - 6PM) , FRI - SUN (11AM - 8PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+BF/@14.4548874,121.0073771,17z/data=!3m1!4b1!4m5!3m4!1s0x3397cf69e95afc4d:0x1385b5722c02c2ed!8m2!3d14.4548833!4d121.0074008",
        contactHref: "tel:09567608146",
      },
      {
        place: "Taters BF Resort",
        address: "Lot 16 Blk 2, Gloria Diaz St., BF Resort Village, Las Pinas",
        contact: "09453218426",
        oparationHour: "MON - THU (12NN - 8PM) ,FRI - SUN (11AM - 8PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+BF+Resort/@14.4416395,120.9820554,15z/data=!4m8!1m2!2m1!1staters+bf+resort!3m4!1s0x3397d1a2a77d2915:0x59fe2add6e73f021!8m2!3d14.4416395!4d120.9908101",
        contactHref: "tel:09453218426",
      },
      {
        place: "Taters Cash & Carry Mall",
        address:
          "Space S20, 2/F Main Atrium, Cash & Carry Mall, Filmore St. Cor Buendia Makati City",
        contact: "09498898635",
        oparationHour: "MON - SUN (10AM - 8PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+Entertainment+Snacks/@14.5586848,121.0040268,17z/data=!4m8!1m2!2m1!1staters+cash+and+carry+makati!3m4!1s0x3397c973bfa64093:0x9db0e04475821b62!8m2!3d14.558656!4d121.00655",
        contactHref: "tel:09498898635",
      },
      //3
      {
        place: "Taters Century Mall",
        address:
          "Century City Mall, Century City, Kalayaan Avenue, Makati, Metro Manila, Philippines",
        contact: "09498899537",
        oparationHour: "MON - SUN (10AM - 8PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+Entertainment+Snacks/@14.565444,121.0254743,17z/data=!3m1!4b1!4m5!3m4!1s0x3397c9a97d48b5bd:0xe37aeed164ac36e4!8m2!3d14.565444!4d121.027663",
        contactHref: "tel:09498899537",
      },
      {
        place: "Taters Evia Daanghari Hub",
        address:
          "3F Evia Lifestyle Center, Daang Hari Road, Almanza Dos Las Pinas 1750",
        contact: "09498899536",
        oparationHour: "MON - SUN (10AM - 7PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+Entertainment+Snacks/@14.3760127,121.0027952,15z/data=!4m8!1m2!2m1!1staters+evia+daang+hari!3m4!1s0x3397d13f7289ac13:0xb43f4537e29096de!8m2!3d14.3760127!4d121.0115499",
        contactHref: "tel:09498898635",
      },
      {
        place: "Taters Glorietta 1",
        address:
          "Ground Floor , Glorietta 1 Ayala Center, Makati City (near mall entrance in between National Bookstore and Giordano)",
        contact: "09498898637",
        oparationHour: "MON - THU (10AM - 7PM) , FRI - SUN (10AM - 8PM)",
        addressHref: "_blank",
        contactHref: "tel:09498898635",
      },
      //4
      {
        place: "Taters Glorietta4",
        address:
          "3rd Floor , Glorietta 4 Ayala Center, Makati City (in front of Marugame Udon) ",
        contact: "09498898637",
        oparationHour: "MON - SUN (10AM - 7PM)",
        addressHref: "_blank",
        contactHref: "tel:09498898637",
      },
      {
        place: "Taters Maginhawa",
        address:
          "168 Maginhawa St. Corner Mapagkumbaba St, Sikatuna Village, Dilian QC ",
        contact: "09178828377",
        oparationHour: "MON - SUN (12NN - 10PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+Maginhawa+Quezon+City/@14.6391742,121.0612801,17z/data=!3m1!4b1!4m5!3m4!1s0x3397b7d9daa302b3:0x75af31e7b6419c84!8m2!3d14.6391742!4d121.0612801",
        contactHref: "tel:09178828377",
      },
      {
        place: "Taters Malate",
        address: "1020 San Adres St. Cor Singalong St. Malate Manila ",
        contact: "09988568749",
        oparationHour: "MON - SUN (12NN - 9PM)",
        addressHref: "_blank",
        contactHref: "tel:09988568749",
      },
      //5
      {
        place: "Taters Market Market",
        address:
          "Market! Market!, McKinley Parkway, Fort Bonifacio, Taguig, NCR, Fourth District, ",
        contact: "09498898634",
        oparationHour: "MON - SUN (10AM - 6PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+Entertainment+Snacks/@14.550892,121.0539133,17z/data=!3m1!4b1!4m5!3m4!1s0x3397c8f32e21408d:0x76fef4d310958cd6!8m2!3d14.550892!4d121.056102",
        contactHref: "tel:09498898634",
      },
      {
        place: "Taters Rob Magnolia",
        address:
          "3rd Level, Robinsons Movieworld Magnolia Town Center, Brgy Kaunlara, Quezon City ",
        contact: "09498899548",
        oparationHour: "MON - FRI (11AM - 8PM) , SAT - SUN (10AM - 8:30PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+Entertainment+Snacks/@14.6150796,121.0383885,17z/data=!3m1!4b1!4m5!3m4!1s0x3397b7cdc965b3cf:0xc5f78fc8a8cdb733!8m2!3d14.6150796!4d121.0383885",
        contactHref: "tel:09498899548",
      },
      {
        place: "Taters SM Fairview",
        address: "Cart Set-up: G/F, Entrance 7, SM Fairview ",
        contact: "09498899551",
        oparationHour: "MON - SUN (10AM - 9PM)",
        addressHref:
          "https://www.google.com/maps/place/SM+City+Fairview+Annex/@14.7341222,121.0560578,17z/data=!4m8!1m2!2m1!1sground+floor+entrance+sm+city+fairview!3m4!1s0x3397b05d60040587:0x239604c1a215bb3c!8m2!3d14.7334261!4d121.0559527",
        contactHref: "tel:09498899551",
      },
      //6
      {
        place: "Taters SM Manila",
        address: "Space K004 Lower Ground Floor, SM City Manila ",
        contact: "09173164804",
        oparationHour: "MON - SUN (10AM - 9PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+SM+Manila/@14.5901276,120.98023,17z/data=!3m1!4b1!4m5!3m4!1s0x3397cbf953ebb759:0x9b8c0b31e23fc89e!8m2!3d14.5901224!4d120.9824187",
        contactHref: "tel:09173164804",
      },
      {
        place: "Taters SM Megamall",
        address: "Lower ground floor, megamall A, in front of Food Court ",
        contact: "09457746743",
        oparationHour: "MON - SUN (11AM - 10PM)",
        addressHref: "_blank",
        contactHref: "tel:09457746743",
      },
      {
        place: "Taters SM San Lazaro",
        address:
          "K017 Lower Ground Floor SM San Lazaro, Felix Huertas Street corner Lacson Avenue (C-2 Road), Santa Cruz, Manila",
        contact: "09498899552",
        oparationHour: "MON - SUN (11AM - 8PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+Entertainment+Snacks/@14.61916,120.9679337,14z/data=!4m8!1m2!2m1!1staters+sm+san+lazaro!3m4!1s0x3397b536d25f50a3:0x716a7672e8479f54!8m2!3d14.6182773!4d120.9853536 ",
        contactHref: "tel:09498899552",
      },
      //7
      {
        place: "Taters SM Southmall",
        address:
          "C119-N Ground Floor, SM SouthMall Alabang-Zapote Road, Pilar Village, Almanza Uno, Las Pi?as, Metro Manila ",
        contact: "09303031440",
        oparationHour: "MON - SUN (10AM - 9PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+Entertainment+Snacks/@14.4339461,121.0091561,17z/data=!3m1!4b1!4m5!3m4!1s0x3397d14de8b234ad:0x49e88f48a5d94bc!8m2!3d14.4339409!4d121.0113448",
        contactHref: "tel:09303031440",
      },
      {
        place: "Taters SM Sucat",
        address:
          "Ground Floor, SM Sucat, Doctor Acadio Santos Ave, corner Carlod P Garcia Ave Ext, Paranaque, Manila ",
        contact: "09705197033",
        oparationHour: "MON - SUN (11AM - 9PM)",
        addressHref: "_blank",
        contactHref: "tel:09705197033",
      },
      {
        place: "Taters Trinoma",
        address:
          "Space 4030 Level 4, Trinoma North Ave, Corner Edsa, Quezon City ",
        contact: "09498898633",
        oparationHour: "MON - FRI (11AM - 7PM) ,SAT - SUN (11AM - 8PM) ",
        addressHref:
          "https://www.google.com/maps/place/Taters+Entertainment+Snacks/@14.6556876,121.0291124,17z/data=!3m1!4b1!4m5!3m4!1s0x3397b702a0c723a5:0x543a693ba6b89f4!8m2!3d14.6556876!4d121.0313011",
        contactHref: "tel:09498898633",
      },
      //8
      {
        place: "Taters Waltermart Makati",
        address:
          "5th Floor, Waltermart Mall, Chino Roces Ave., cor A. Arnaiz Ave. San Lorenzo, Makati City ",
        contact: "09498898638",
        oparationHour: "MON - SUN (10AM - 7PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+Entertainment+Snacks/@14.5508281,121.0110227,17z/data=!4m8!1m2!2m1!1staters+waltermart+makati!3m4!1s0x3397c913aa7897cf:0xcd41fa17384894b4!8m2!3d14.55085!4d121.013069",
        contactHref: "tel:09498898635",
      },
    ],
  },
  {
    region: "Luzon",
    branch: [
      //1
      {
        place: "Taters Festival Mall",
        address:
          "Lower Ground Floor expansion wing (across the Water Garden) Festival Mall, Filinvest Corporate City, Alabang, Muntinlupa ",
        contact: "09178828377",
        oparationHour: "MON - SUN (10AM - 9PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+Festival+Mall/@14.3880688,121.0114674,13z/data=!4m9!1m2!2m1!1staters+festival+mall!3m5!1s0x3397d151a4ac0e7d:0xa86241b2841ee036!8m2!3d14.415455!4d121.0400866!15sChR0YXRlcnMgZmVzdGl2YWwgbWFsbFoWIhR0YXRlcnMgZmVzdGl2YWwgbWFsbJIBCXNuYWNrX2Jhcg",
        contactHref: "tel:09178828377",
      },
      {
        place: "Taters Galleria South (San Pedro)",
        address: "179 Manila S Rd, San Pedro, 4023 Laguna ",
        contact: "09771210299",
        oparationHour: "MON - SUN (10AM - 9PM)",
        addressHref:
          "https://www.google.com/maps/place/Robinsons+Galleria+South/@14.3523003,121.0595958,17z/data=!3m1!4b1!4m5!3m4!1s0x3397d0b49ee1db09:0x50ba65f05e4b96ec!8m2!3d14.3523003!4d121.0617845",
        contactHref: "tel:09771210299",
      },
      {
        place: "Taters Marquee Mall Pampanga",
        address:
          "Space 3082, 3rd Level, Taters Marquee, Pulung Maragul Angeles City ",
        contact: "09498898684",
        oparationHour: "MON - SUN (10AM - 7PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+Entertainment+Snacks/@15.163553,120.6070268,17z/data=!4m8!1m2!2m1!1staters+marquee+mall+pampanga!3m4!1s0x3396f207e84a7173:0xb1e6efe82e7dfd57!8m2!3d15.163096!4d120.609661",
        contactHref: "tel:09498898684",
      },
      //2
      {
        place: "Taters Robinsons Antipolo",
        address:
          "Upper Ground Robinsons Place Antipolo, Sumulong Highway Cor. Circumferential Road, Antipolo ",
        contact: "09498898636",
        oparationHour: "MON - SUN (10AM - 9PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+Entertainment+Snacks/@14.5952837,121.1706212,17z/data=!4m8!1m2!2m1!1sTaters+Robinsons+Antipolo!3m4!1s0x3397bf4d1d6561e1:0xca8911e9bc7b43b2!8m2!3d14.595324!4d121.173059",
        contactHref: "tel:09498898636",
      },
      {
        place: "Taters Robinsons Pangasinan",
        address:
          "Level 2, Robinsons Place Pangasinan, San Miguel Calasiao, Pangasinan ",
        contact: "09498899566",
        oparationHour: "MON - SUN (10AM - 8PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+Entertainment+Snacks/@16.0227011,120.3565083,17z/data=!3m1!4b1!4m5!3m4!1s0x339142eaa0658239:0x9c2b393022fdded!8m2!3d16.022696!4d120.358697",
        contactHref: "tel:09498899566",
      },
      {
        place: "Taters Robinsons Tuguegarao",
        address: "Cart Set-up: G/F Robinsons Tuguegarao, Main Entrance ",
        contact: "09051283810",
        oparationHour: "MON - SUN (10AM - 8PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+Entertainment+Snacks+Robinsons+Place+Tuguegarao/@17.6270667,121.7320058,17z/data=!3m1!4b1!4m5!3m4!1s0x338585ad0dd73845:0x286bcefd103a886d!8m2!3d17.6270616!4d121.7341945",
        contactHref: "tel:09051283810",
      },
      //3
      {
        place: "Taters SM Calamba",
        address:
          "C204 2nd Floor SM Calamba, National Road, Calamba City Triangle, Brgy. Real, Calamba City, Laguna ",
        contact: "09362040351",
        oparationHour: "MON - SUN (10AM - 9PM)",
        addressHref:
          "https://www.google.com/maps/place/SM+City+Calamba/@14.2033069,121.1535498,17z/data=!3m1!4b1!4m5!3m4!1s0x33bd63000286fa21:0x18d0e2688547e2d8!8m2!3d14.2033017!4d121.1557385",
        contactHref: "tel:09362040351",
      },
      {
        place: "Taters SM Sta. Rosa",
        address:
          "K114 Ground Floor SM Sta. Rosa, Old National Highway, Brgy. Sta. Rosa Laguna ",
        contact: "09362040351",
        oparationHour: "MON - SUN (10AM - 9PM)",
        addressHref:
          "https://www.google.com/maps/place/Tater's/@14.311915,121.0972529,17z/data=!3m1!4b1!4m5!3m4!1s0x3397d9b77849d63f:0xee69274924c4a2bc!8m2!3d14.311915!4d121.0994416",
        contactHref: "tel:09362040351",
      },
      {
        place: "Taters South Forbes",
        address:
          "Lot 3 Block 18 Unit D Ground Floor VMC Building, South Boulevard, Barangay Inchican, Silang Cavite ",
        contact: "0961035520",
        oparationHour: "MON - SUN (11AM - 8PM)",
        addressHref: "_blank",
        contactHref: "tel:0961035520",
      },
    ],
  },
  {
    region: "Visayas",
    branch: [
      //1
      {
        place: "Taters Ayala Capitol Bacolod",
        address:
          "Table Set-up: G/F Ayala Capitol Bacolod (in front of Mercy Pasalubong Center) ",
        contact: "09972269770",
        oparationHour: "SUN - THU (10AM - 8PM) , FRI - SAT (10AM - 9PM) ",
        addressHref: "_blank",
        contactHref: "tel:09972269770",
      },
      {
        place: "Taters Ayala Center Cebu",
        address:
          "Cardinal Rosales Avenue, Archbishop Reyes Ave, Cebu City, 6000 Cebu ",
        contact: "09338294367",
        oparationHour: "MON - SUN (10AM - 8PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+Entertainment+Snacks/@10.3061265,123.8606831,13z/data=!4m8!1m2!2m1!1sTaters+Ayala+Center+Cebu!3m4!1s0x33a9993faad2261f:0x51c78dd3025fbb57!8m2!3d10.31811!4d123.9049466",
        contactHref: "tel:09338294367",
      },
      {
        place: "Taters Ayala Malls Capitol Central",
        address:
          "Cinema Lobby, Fourth Floor, Ayala Malls Capitol Central, Gatuslao Street, Brgy. 8, Bacolod City ",
        contact: "09972269770",
        oparationHour: "SUN - THU (10AM - 8PM) FRI - SAT (10AM - 9PM)",
        addressHref:
          "https://www.google.com/maps/place/Ayala+Malls+Capitol+Central/@10.6796962,122.9493873,15z/data=!4m8!1m2!2m1!1staters+ayala+capitol+central!3m4!1s0x33aed18256adad23:0x4f7deda1f401be6b!8m2!3d10.6769092!4d122.9496363",
        contactHref: "tel:09972269770",
      },
      //2
      {
        place: "Taters Citymall Boracay",
        address: "G/F Citymall Boracay, Tambisaan Jetty Port Rd, Malay, Aklan ",
        contact: "09956918010",
        oparationHour: "MON - SUN (9AM - 7PM)",
        addressHref: "_blank",
        contactHref: "tel:09956918010",
      },
      {
        place: "Taters Robinsons Galleria Cebu",
        address:
          "G/F near Southstar Drug, Robinsons Galleria, General Maxilom Ave., Cebu City ",
        contact: "09498898679",
        oparationHour: "MON - SUN (10AM - 8PM)",
        addressHref: "_blank",
        contactHref: "tel:09498898679",
      },
      {
        place: "Taters Robinsons North Tacloban",
        address:
          "Level 3 Robinsons Place North Tacloban, Barangay Abucay, Tacloban City ",
        contact: "09498899539",
        oparationHour: "MON - SUN (10AM - 9PM)",
        addressHref: "_blank",
        contactHref: "tel:09498899539",
      },
    ],
  },
  {
    region: "Mindanao",
    branch: [
      //1
      {
        place: "Taters Abreeza Davao",
        address:
          "Abreeza Ayala Mall, J.P. Laurel Avenue, Bajada, Davao City, Davao del Sur ",
        contact: "09498899561",
        oparationHour: "SUN- THU (10AM - 8PM) , FRI - SAT (10AM - 9PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+Abreeza+Mall/@7.0911967,125.60941,17z/data=!3m1!4b1!4m5!3m4!1s0x32f96daa397629c3:0x9fcf6fa7ce363540!8m2!3d7.0911967!4d125.6115987",
        contactHref: "tel:09498899561",
      },
      {
        place: "Taters Robinsons Place Valencia",
        address: "Cart Set-up: G/F, Activity Center, Robinsons Valencia ",
        contact: "09498365667",
        oparationHour: "MON - SUN (10AM - 7PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+Entertainment+Snacks/@7.9193016,125.0789312,14z/data=!4m8!1m2!2m1!1staters+Robinsons+Place+Valencia!3m4!1s0x32ff1b71c6839afb:0xde6f25c394855f71!8m2!3d7.9349119!4d125.1006197",
        contactHref: "tel:09498365667",
      },
      {
        place: "Taters SM Lanang",
        address:
          "K205 2nd Floor SM Lanang Premier, J.P. Laurel Ave., Brgy. San Antonio, Agdao, Davao City ",
        contact: "09303351231",
        oparationHour: "MON - THU (10AM - 8PM) , FRI - SUN (10AM - 9PM)",
        addressHref:
          "https://www.google.com/maps/place/Taters+SM+Lanang/@7.0990605,125.6288791,17z/data=!4m8!1m2!2m1!1staters+SM+Lanang!3m4!1s0x32f96db5e9127469:0x4a4c318107f7fe3f!8m2!3d7.0991684!4d125.6310916",
        contactHref: "tel:09303351231",
      },
      //2
      {
        place: "Taters Tulip Drive – Davao",
        address: "#32 Tulip Drive St. Juna Subdivision Davao City ",
        contact: "09989901936",
        oparationHour: "MON - SUN (11AM - 5PM)",
        addressHref: "_blank",
        contactHref: "tel:09989901936",
      },
    ],
  },
];
