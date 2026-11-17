

function makePost(
    species,
    name,
    flag,
    content,
    likes,
    comments = [],
    images = []
  ) {
    return {
      id: `${species.toLowerCase()}-${name.toLowerCase()}`,
      author: name,
      species,
      flag,
      avatar: `assets/explore/avatars/${species}_${name}.jpg`,
      content,
      likes,
      shares: Math.floor(likes / 9),
  
      comments: comments.map(([author, content]) => ({
        author,
        content
      })),
  
      images: images.map(filename =>
        `assets/explore/posts/${filename}`
      )
    };
  }
  
  const explorePosts = [

    makePost(
      "Bird", "Abby", "🇬🇧",
      "My human keeps calling me a pretty bird. I KNOW. Tell me something new.",
      68,
      [
        ["Holly", "You're very modest, I see."],
        ["Luna", "Pretty birds deserve compliments!"]
      ]
    ),
  
    makePost(
      "Bird", "Holly", "🇦🇺",
      "I sang the same song 37 times this morning. My human only applauded once. Tough audience.",
      92,
      [
        ["Abby", "Try singing louder."],
        ["Mango", "I support your artistic career!"]
      ]
    ),
  
    makePost(
      "Bird", "Luna", "🇫🇮",
      "The wind was perfect today. I could sit by the window and listen to the trees forever.",
      47,
      [
        ["Mela", "That sounds peaceful."]
      ]
    ),
  
    makePost(
      "Bird", "Mango", "🇳🇿",
      "I learned a new sound today! Unfortunately, it's the microwave beep. Now everyone thinks dinner is ready.",
      134,
      [
        ["Tina", "This is a superpower."],
        ["Abby", "Please teach me."],
        ["Holly", "You're causing chaos."],
        ["Mela", "Your humans must be so confused!"]
      ]
    ),
  
    makePost(
      "Bird", "Mela", "🇩🇪",
      "Why do humans close the curtains? I was watching a VERY important pigeon meeting outside.",
      76,
      [
        ["Luna", "Maybe the meeting was classified."]
      ]
    ),
  
    makePost(
      "Bird", "Tina", "🇨🇦",
      "I dropped my favorite toy off the table. My human picked it up. So I dropped it again. We played for 20 minutes!",
      109,
      [
        ["Mango", "Humans are so easy to train."],
        ["Abby", "Mine plays this game too!"]
      ]
    ),

    makePost(
      "Bunny", "Betty", "🇳🇱",
      "I spent all afternoon digging at my blanket. I haven't found anything yet, but I'm making excellent progress.",
      83,
      [
        ["Puff", "Keep digging!"],
        ["Dango", "What are we looking for?"]
      ]
    ),
  
    makePost(
      "Bunny", "Dango", "🇯🇵",
      "Someone moved my cardboard tunnel TWO CENTIMETERS to the left. My entire living room is ruined.",
      116,
      [
        ["Betty", "Unacceptable."],
        ["Harry", "I'd be upset too."]
      ]
    ),
  
    makePost(
      "Bunny", "Harry", "🇬🇧",
      "I'm sick, and now I have to wear this uncomfortable cone. I feel so miserable... Could everyone wish me a speedy recovery? 🥺",
      194,
      [
        ["Betty", "Get well soon, Harry! ♡"],
        ["Dango", "Sending you lots of love!"],
        ["Puff", "Hope you feel better very soon!"],
        ["Mufin", "Stay strong, little friend!"]
      ],
      ["Harry_P1.jpg"]
    ),
  
    makePost(
      "Bunny", "Mufin", "🇨🇭",
      "My human offered me a new vegetable. I sniffed it, considered it carefully, and decided the old one was better.",
      71,
      [
        ["Puff", "A rabbit of refined taste."]
      ]
    ),
  
    makePost(
      "Bunny", "Puff", "🇸🇪",
      "I found the softest corner of the sofa. Nobody is allowed to sit here anymore. It's mine.",
      102,
      [
        ["Betty", "Claim it with your whole body!"],
        ["Dango", "Excellent choice."]
      ]
    ),

    makePost(
      "Cat", "April", "🇫🇷",
      "I watched a bird through the window for 45 minutes. Then it flew away without even saying goodbye. Rude.",
      121,
      [
        ["Milo", "Birds have no manners."],
        ["Nono", "Did you make the little clicking noise?"]
      ]
    ),
  
    makePost(
      "Cat", "Cheeto", "🇨🇳",
      "This human stayed with me for such a long time today. Her lap was so warm. I really, really like her. ♡",
      237,
      [
        ["Tutu", "Warm laps are the best!"],
        ["April", "Did you fall asleep?"],
        ["Milo", "Sounds like a good human."],
        ["Nono", "I hope she visits again!"]
      ],
      ["Cheeto_P1.jpg"]
    ),
  
    makePost(
      "Cat", "Coconut", "🇯🇵",
      "My human bought me a hamburger outfit! Do I look good in it? 🍔",
      186,
      [
        ["Tutu", "YOU LOOK DELICIOUS."],
        ["April", "Fashion icon."],
        ["Milo", "I would eat that hamburger."],
        ["Cheeto", "10/10 outfit!"]
      ],
      ["Coconut_P1.jpg"]
    ),
  
    makePost(
      "Cat", "Milo", "🇨🇦",
      "The red dot appeared on the wall again. I almost caught it this time. Tomorrow, victory will be mine.",
      153,
      [
        ["April", "I've been chasing one for years."],
        ["Nono", "Don't give up!"]
      ]
    ),
  
    makePost(
      "Cat", "Nono", "🇩🇪",
      "I sat on my human's keyboard and suddenly everyone on the screen started talking. I think I have a job now.",
      174,
      [
        ["Coconut", "Congratulations on your promotion!"],
        ["Tutu", "Do they pay you in treats?"]
      ]
    ),
  
    makePost(
      "Cat", "Tutu", "🇨🇳",
      "I've discovered that if I sleep here curled up like a bagel, lots of humans come over to pet me! 🥯",
      264,
      [
        ["Cheeto", "Teach me your secrets."],
        ["Coconut", "A very fluffy bagel."],
        ["April", "That's actually genius."],
        ["Milo", "I prefer not to be disturbed."]
      ],
      ["Tutu_P1.jpg"]
    ),

    makePost(
      "Dog", "Bobby", "🇺🇸",
      "MY HUMAN SAID WE'RE GOING FOR A WALK!!! I'VE BEEN WAITING MY WHOLE LIFE FOR THIS MOMENT!!! (It has been 4 hours.)",
      188,
      [
        ["Jojo", "WALK WALK WALK!!!"],
        ["Randy", "BEST NEWS EVER!"]
      ]
    ),
  
    makePost(
      "Dog", "Coco", "🇦🇺",
      "EVERYONE LOOK!!! MY NOSE TURNED INTO A BLUEBERRY!!! 🫐",
      219,
      [
        ["Bobby", "CAN I SNIFF IT?"],
        ["Honey", "That is the cutest blueberry ever!"],
        ["Copper", "How did you do that?"],
        ["Wendy", "Is it edible?"]
      ],
      ["Coco_P1.jpg"]
    ),
  
    makePost(
      "Dog", "Copper", "🇨🇭",
      "The sunshine is SO GOOD today! ☀️",
      142,
      [
        ["Lucky", "Perfect weather for an adventure!"],
        ["Simba", "Save me a sunny spot!"]
      ],
      ["Copper_P1.jpg"]
    ),
  
    makePost(
      "Dog", "Henry", "🇬🇧",
      "My human threw the ball. I brought it back. Then they threw it AGAIN. I don't understand why they keep losing it.",
      201,
      [
        ["Bobby", "Humans are terrible at keeping balls."],
        ["Jojo", "BUT THROWING IS FUN!"]
      ]
    ),
  
    makePost(
      "Dog", "Honey", "🇨🇦",
      "I met a new human today and they called me a good girl. I think we're best friends now.",
      164,
      [
        ["Coco", "Did you get belly rubs?"],
        ["Wendy", "That's a very fast friendship."]
      ]
    ),
  
    makePost(
      "Dog", "Jojo", "🇯🇵",
      "I heard a plastic bag open in the kitchen. I was asleep upstairs. I arrived in 0.3 seconds.",
      226,
      [
        ["Bobby", "IMPRESSIVE SPEED."],
        ["Simba", "Was it food?!"],
        ["Randy", "Please share your training routine."]
      ]
    ),
  
    makePost(
      "Dog", "Lucky", "🇳🇿",
      "Out hiking with my human again! I'm SO HAPPY!!! 🐾",
      173,
      [
        ["Copper", "The outdoors is the best!"],
        ["Bobby", "DID YOU FIND ANY STICKS?"],
        ["Honey", "Have fun and stay safe!"]
      ],
      ["Lucky_P1.jpg"]
    ),
  
    makePost(
      "Dog", "Randy", "🇩🇪",
      "A stranger told my human I look intimidating. Five minutes later I was begging that stranger for belly rubs.",
      158,
      [
        ["Honey", "Belly rubs are important!"],
        ["Henry", "A successful negotiation."]
      ]
    ),
  
    makePost(
      "Dog", "Simba", "🇳🇱",
      "I buried my favorite toy in the garden. Now I can't remember where. Please respect my privacy during this difficult time.",
      191,
      [
        ["Jojo", "I CAN HELP DIG!"],
        ["Bobby", "THIS IS AN EMERGENCY."],
        ["Lucky", "Check under the big tree!"]
      ]
    ),
  
    makePost(
      "Dog", "Wendy", "🇯🇵",
      "The neighbor's dog came over to play today, but he doesn't seem to understand personal space. He keeps getting WAY too close! Is this just how Shiba Inus show affection?",
      248,
      [
        ["Honey", "Maybe he's just really excited to meet you!"],
        ["Coco", "Some dogs have absolutely no chill."],
        ["Copper", "You can tell him you need some space!"],
        ["Randy", "Not every dog likes face-to-face greetings."]
      ],
      ["Wendy_P1.jpg", "Wendy_P2.jpg"]
    ),

    makePost(
      "Hamster", "Donut", "🇨🇦",
      "I carried five sunflower seeds in my cheeks today. Nobody knows where I hid them. Not even me.",
      104,
      [
        ["Jelly", "A true mystery."],
        ["Winnie", "Check your bedding!"]
      ]
    ),
  
    makePost(
      "Hamster", "Jelly", "🇸🇪",
      "My human cleaned my house and moved all my secret food storage. I will be filing a formal complaint.",
      132,
      [
        ["Donut", "THIS IS A CRIME."],
        ["Maggie", "They never respect our architecture."]
      ]
    ),
  
    makePost(
      "Hamster", "Latte", "🇫🇷",
      "Ran on my wheel for three hours last night. Still in the same place. Starting to question everything.",
      176,
      [
        ["Romy", "Have you tried running faster?"],
        ["Mia", "Maybe tomorrow you'll get somewhere."]
      ]
    ),
  
    makePost(
      "Hamster", "Lulu", "🇯🇵",
      "A tiny piece of cucumber has made this the greatest day of my life.",
      88,
      [
        ["Yoyo", "CUCUMBER!!!"]
      ]
    ),
  
    makePost(
      "Hamster", "Maggie", "🇩🇰",
      "I spent all night arranging my bedding into the perfect nest. My human called it a mess. They don't understand interior design.",
      143,
      [
        ["Jelly", "Artists are never appreciated."],
        ["Winnie", "I would love a house tour."]
      ]
    ),
  
    makePost(
      "Hamster", "Mia", "🇨🇭",
      "Sometimes I wake up, eat one seed, look around, and go straight back to sleep. Busy schedule.",
      97,
      [
        ["Latte", "Sounds exhausting."]
      ]
    ),
  
    makePost(
      "Hamster", "Romy", "🇳🇱",
      "I escaped my enclosure for exactly 11 minutes. Saw the living room. Too big. Went home.",
      204,
      [
        ["Donut", "Legendary explorer."],
        ["Jelly", "Did you bring back snacks?"],
        ["Maggie", "Was it worth it?"],
        ["Lulu", "I would have been scared!"]
      ]
    ),
  
    makePost(
      "Hamster", "Winnie", "🇬🇧",
      "My cheeks are full. My heart is full. My food bowl is empty. Everything is going according to plan.",
      117,
      [
        ["Mia", "Perfect day."],
        ["Yoyo", "Save some for later!"]
      ]
    ),
  
    makePost(
      "Hamster", "Yoyo", "🇦🇺",
      "I heard someone say 'just one treat.' I don't understand what 'one' means.",
      155,
      [
        ["Lulu", "Me neither!"],
        ["Donut", "I think it means at least six."]
      ]
    ),

    makePost(
      "Lizard", "George", "🇦🇺",
      "My basking rock was exactly the right temperature today. I have achieved inner peace. Please do not move me.",
      129,
      [
        ["Stephen", "Warm rocks are underrated."],
        ["Tommy", "Enjoy your peaceful afternoon!"]
      ]
    ),

    makePost(
      "Pig", "Jonny", "🇩🇪",
      "I discovered that if I push the food bowl across the floor, it makes a wonderful noise. My human disagrees.",
      161,
      [
        ["Pina", "Keep making music!"],
        ["Rocky", "Maybe they'll give you more food."]
      ]
    ),
  
    makePost(
      "Pig", "Pina", "🇳🇱",
      "Someone hid little pieces of apple around the room for me to find. BEST TREASURE HUNT EVER.",
      184,
      [
        ["Jonny", "WHERE ARE THE APPLES?"],
        ["Rocky", "I want to play too!"]
      ]
    ),
  
    makePost(
      "Pig", "Rocky", "🇨🇦",
      "I rolled around in the mud today and felt absolutely beautiful. Then my human mentioned something about a bath.",
      196,
      [
        ["Pina", "Beauty comes at a price."],
        ["Jonny", "RUN."]
      ]
    ),

    makePost(
      "Snake", "Richard", "🇬🇧",
      "My human bought me a new branch. I inspected it for two hours. It is acceptable.",
      114,
      [
        ["Stephen", "A thorough inspection is essential."],
        ["Tommy", "Does it have a good climbing angle?"]
      ]
    ),
  
    makePost(
      "Snake", "Stephen", "🇺🇸",
      "It's shedding season. I would appreciate it if everyone could stop asking why I look so grumpy.",
      149,
      [
        ["Richard", "Understandable."],
        ["Tommy", "Hope your shed goes smoothly!"]
      ]
    ),
  
    makePost(
      "Snake", "Tommy", "🇦🇺",
      "I found a new hiding spot. It's dark, quiet, and nobody can see me. Five stars.",
      127,
      [
        ["Richard", "Excellent review."],
        ["Stephen", "Sounds perfect."]
      ]
    )
  
  ];

  const animalAvatarMap = {};
  
  explorePosts.forEach((post, index) => {
  
    animalAvatarMap[post.author] = post.avatar;
  
    const day = 16 - (index % 15);
    const hour = 8 + ((index * 3) % 15);
    const minute = (index * 17) % 60;
  
    post.date =
      `2060-11-${String(day).padStart(2, "0")} ` +
      `${String(hour).padStart(2, "0")}:` +
      `${String(minute).padStart(2, "0")}`;
  });
  
  explorePosts.forEach(post => {
    post.comments.forEach(comment => {
      comment.avatar =
        animalAvatarMap[comment.author] ||
        "assets/avatar/Pineapple.jpg";
    });
  });
  
  console.log(`Loaded ${explorePosts.length} SniffNet posts.`);
  