import os

states_data = {
    "Rajasthan": {
        "title": "RAJASTHAN",
        "tagline": "The Land of Kings",
        "description": "Discover the royal heritage, magnificent palaces, and vibrant culture of Rajasthan. From the golden sands of Jaisalmer to the pink city of Jaipur, explore the land of kings.",
        "capital": "Jaipur",
        "population": "68 Million",
        "best_time": "Oct-Mar",
        "language": "Hindi",
        "css_class": "rajasthan",
        "monuments": [
            {"name": "Hawa Mahal", "description": "The Palace of Winds is a five-story palace in Jaipur, built with red and pink sandstone. It was designed to allow royal ladies to observe street festivals without being seen."},
            {"name": "Amber Fort", "description": "Amber Fort is a magnificent fort located in Amer, Rajasthan. It's known for its artistic Hindu style elements and is a UNESCO World Heritage Site."},
            {"name": "City Palace, Jaipur", "description": "The City Palace is a palace complex in Jaipur, which includes the Chandra Mahal and Mubarak Mahal palaces and other buildings."},
            {"name": "Jantar Mantar", "description": "Jantar Mantar is a collection of nineteen architectural astronomical instruments built by the Rajput king Sawai Jai Singh II."}
        ]
    },
    "Maharastra": {
        "title": "MAHARASHTRA",
        "tagline": "The Land of Warriors",
        "description": "Discover the rich heritage, magnificent forts, and vibrant culture of Maharashtra. From the bustling city of Mumbai to the ancient caves of Ajanta and Ellora, explore the heart of India.",
        "capital": "Mumbai",
        "population": "112 Million",
        "best_time": "Oct-Mar",
        "language": "Marathi",
        "css_class": "maharashtra",
        "monuments": [
            {"name": "Gateway of India", "description": "An iconic monument located in Mumbai, built to commemorate the visit of King George V and Queen Mary to India in 1911."},
            {"name": "Ajanta Caves", "description": "A UNESCO World Heritage Site featuring ancient Buddhist cave monuments dating back to the 2nd century BCE."},
            {"name": "Ellora Caves", "description": "A UNESCO World Heritage Site with 34 caves representing Buddhist, Hindu, and Jain religious traditions."},
            {"name": "Shivneri Fort", "description": "The birthplace of Chhatrapati Shivaji Maharaj, this fort is a significant historical monument in Maharashtra."}
        ]
    },
    "Gujarat": {
        "title": "GUJARAT",
        "tagline": "The Land of Legends",
        "description": "Discover the rich cultural heritage, ancient temples, and vibrant traditions of Gujarat. From the sacred Somnath Temple to the beautiful Rann of Kutch, explore the heart of western India.",
        "capital": "Gandhinagar",
        "population": "60 Million",
        "best_time": "Oct-Mar",
        "language": "Gujarati",
        "css_class": "gujarat",
        "monuments": [
            {"name": "Somnath Temple", "description": "One of the twelve Jyotirlinga shrines of Lord Shiva, located in Prabhas Patan near Veraval in Gujarat."},
            {"name": "Rani ki Vav", "description": "A UNESCO World Heritage Site, this stepwell is considered to be one of the finest and largest examples of stepwell architecture in Gujarat."},
            {"name": "Dwarkadhish Temple", "description": "A Hindu temple dedicated to Lord Krishna, located in Dwarka, Gujarat. It's one of the four sacred pilgrimage sites."},
            {"name": "Sabarmati Ashram", "description": "The former residence of Mahatma Gandhi, now a museum dedicated to his life and philosophy."}
        ]
    },
    "West Bengal": {
        "title": "WEST BENGAL",
        "tagline": "The Cultural Capital",
        "description": "Discover the rich cultural heritage, magnificent temples, and vibrant traditions of West Bengal. From the beautiful city of Kolkata to the serene hills of Darjeeling, explore the heart of eastern India.",
        "capital": "Kolkata",
        "population": "91 Million",
        "best_time": "Oct-Mar",
        "language": "Bengali",
        "css_class": "west-bengal",
        "monuments": [
            {"name": "Victoria Memorial", "description": "A large marble building in Kolkata, built between 1906 and 1921. It's dedicated to the memory of Queen Victoria."},
            {"name": "Howrah Bridge", "description": "A cantilever bridge over the Hooghly River in West Bengal. It's considered an engineering marvel and a symbol of Kolkata."},
            {"name": "Dakshineswar Kali Temple", "description": "A Hindu temple located in Dakshineswar near Kolkata, dedicated to the goddess Kali."},
            {"name": "Darjeeling Himalayan Railway", "description": "A UNESCO World Heritage Site, this narrow-gauge railway is famous for its scenic beauty and engineering marvels."}
        ]
    },
    "Punjab": {
        "title": "PUNJAB",
        "tagline": "The Land of Five Rivers",
        "description": "Discover the rich cultural heritage, magnificent gurudwaras, and vibrant traditions of Punjab. From the sacred Golden Temple to the beautiful countryside, explore the heart of northern India.",
        "capital": "Chandigarh",
        "population": "27 Million",
        "best_time": "Oct-Mar",
        "language": "Punjabi",
        "css_class": "punjab",
        "monuments": [
            {"name": "Golden Temple", "description": "The holiest shrine of Sikhism, also known as Harmandir Sahib. It's a symbol of human brotherhood and equality."},
            {"name": "Jallianwala Bagh", "description": "A public garden in Amritsar, historically important as the site of the 1919 Jallianwala Bagh massacre."},
            {"name": "Wagah Border", "description": "The international border between India and Pakistan, famous for the daily flag lowering ceremony."},
            {"name": "Anandpur Sahib", "description": "A holy city in Punjab, known for its historical significance in Sikh history and the Khalsa Panth."}
        ]
    },
    "Uttar Pradesh": {
        "title": "UTTAR PRADESH",
        "tagline": "The Heart of India",
        "description": "Discover the rich cultural heritage, magnificent monuments, and vibrant traditions of Uttar Pradesh. From the iconic Taj Mahal to the sacred city of Varanasi, explore the heart of India.",
        "capital": "Lucknow",
        "population": "199 Million",
        "best_time": "Oct-Mar",
        "language": "Hindi",
        "css_class": "uttar-pradesh",
        "monuments": [
            {"name": "Taj Mahal", "description": "A UNESCO World Heritage Site and one of the Seven Wonders of the World. A magnificent white marble mausoleum built by Mughal Emperor Shah Jahan."},
            {"name": "Varanasi Ghats", "description": "The sacred city of Varanasi is famous for its ghats along the Ganges River, where pilgrims perform religious rituals."},
            {"name": "Fatehpur Sikri", "description": "A UNESCO World Heritage Site, this abandoned Mughal city was the capital of the Mughal Empire for 10 years."},
            {"name": "Agra Fort", "description": "A UNESCO World Heritage Site, this red sandstone fort was the main residence of the Mughal emperors."}
        ]
    },
    "Madhya Pradesh": {
        "title": "MADHYA PRADESH",
        "tagline": "The Heart of India",
        "description": "Discover the rich cultural heritage, magnificent temples, and vibrant traditions of Madhya Pradesh. From the ancient temples of Khajuraho to the beautiful wildlife sanctuaries, explore the heart of India.",
        "capital": "Bhopal",
        "population": "72 Million",
        "best_time": "Oct-Mar",
        "language": "Hindi",
        "css_class": "madhya-pradesh",
        "monuments": [
            {"name": "Khajuraho Temples", "description": "A UNESCO World Heritage Site, these temples are famous for their intricate sculptures and architectural beauty."},
            {"name": "Sanchi Stupa", "description": "A UNESCO World Heritage Site, this Buddhist monument is one of the oldest stone structures in India."},
            {"name": "Gwalior Fort", "description": "A hill fort near Gwalior, known for its impressive architecture and historical significance."},
            {"name": "Mandu", "description": "A ruined city in Madhya Pradesh, known for its Afghan architecture and romantic legends."}
        ]
    },
    "Bihar": {
        "title": "BIHAR",
        "tagline": "The Land of Enlightenment",
        "description": "Discover the rich cultural heritage, ancient Buddhist sites, and vibrant traditions of Bihar. From the sacred Bodh Gaya to the ancient Nalanda University, explore the land of enlightenment.",
        "capital": "Patna",
        "population": "104 Million",
        "best_time": "Oct-Mar",
        "language": "Hindi",
        "css_class": "bihar",
        "monuments": [
            {"name": "Bodh Gaya", "description": "A UNESCO World Heritage Site, this is where Buddha attained enlightenment under the Bodhi tree."},
            {"name": "Nalanda University", "description": "A UNESCO World Heritage Site, this ancient center of learning was one of the world's first universities."},
            {"name": "Patna Sahib", "description": "One of the five Takhts of Sikhism, this gurudwara is dedicated to Guru Gobind Singh."},
            {"name": "Vikramshila University", "description": "An ancient center of Buddhist learning, established by the Pala dynasty."}
        ]
    },
    "Odisha": {
        "title": "ODISHA",
        "tagline": "The Soul of Incredible India",
        "description": "Discover the rich cultural heritage, magnificent temples, and vibrant traditions of Odisha. From the iconic Sun Temple of Konark to the beautiful beaches of Puri, explore the soul of India.",
        "capital": "Bhubaneswar",
        "population": "41 Million",
        "best_time": "Oct-Mar",
        "language": "Odia",
        "css_class": "odisha",
        "monuments": [
            {"name": "Konark Sun Temple", "description": "A UNESCO World Heritage Site, this 13th-century temple is dedicated to the Sun God and is famous for its architectural grandeur."},
            {"name": "Jagannath Temple", "description": "A famous Hindu temple dedicated to Lord Jagannath, located in Puri. It's one of the Char Dham pilgrimage sites."},
            {"name": "Lingaraja Temple", "description": "A Hindu temple dedicated to Lord Shiva, located in Bhubaneswar. It's one of the oldest temples in Odisha."},
            {"name": "Chilika Lake", "description": "A brackish water lagoon and the largest coastal lagoon in India, famous for its biodiversity and migratory birds."}
        ]
    },
    "Assam": {
        "title": "ASSAM",
        "tagline": "The Land of Blue Hills",
        "description": "Discover the rich cultural heritage, magnificent temples, and vibrant traditions of Assam. From the sacred Kamakhya Temple to the beautiful Kaziranga National Park, explore the land of blue hills.",
        "capital": "Dispur",
        "population": "31 Million",
        "best_time": "Oct-Mar",
        "language": "Assamese",
        "css_class": "assam",
        "monuments": [
            {"name": "Kaziranga National Park", "description": "A UNESCO World Heritage Site, famous for its one-horned rhinoceros and diverse wildlife."},
            {"name": "Kamakhya Temple", "description": "A famous Shakti temple located in Guwahati, dedicated to the goddess Kamakhya."},
            {"name": "Manas National Park", "description": "A UNESCO World Heritage Site, this national park is famous for its wildlife and scenic beauty."},
            {"name": "Majuli Island", "description": "The world's largest river island, known for its Vaishnavite monasteries and cultural heritage."}
        ]
    },
    "Jharkhand": {
        "title": "JHARKHAND",
        "tagline": "The Land of Forests",
        "description": "Discover the rich cultural heritage, magnificent temples, and vibrant traditions of Jharkhand. From the ancient temples of Deoghar to the beautiful waterfalls, explore the land of forests.",
        "capital": "Ranchi",
        "population": "32 Million",
        "best_time": "Oct-Mar",
        "language": "Hindi",
        "css_class": "jharkhand",
        "monuments": [
            {"name": "Baidyanath Temple", "description": "A famous Hindu temple dedicated to Lord Shiva, located in Deoghar. It's one of the twelve Jyotirlingas."},
            {"name": "Hundru Falls", "description": "One of the most beautiful waterfalls in Jharkhand, located near Ranchi."},
            {"name": "Patratu Valley", "description": "A beautiful valley known for its scenic beauty and pleasant climate."},
            {"name": "Betla National Park", "description": "A national park famous for its wildlife and natural beauty."}
        ]
    },
    "Chattisgarh": {
        "title": "CHHATTISGARH",
        "tagline": "The Rice Bowl of India",
        "description": "Discover the rich cultural heritage, magnificent temples, and vibrant traditions of Chhattisgarh. From the ancient temples of Sirpur to the beautiful waterfalls, explore the rice bowl of India.",
        "capital": "Raipur",
        "population": "25 Million",
        "best_time": "Oct-Mar",
        "language": "Hindi",
        "css_class": "chhattisgarh",
        "monuments": [
            {"name": "Bastar Palace", "description": "A historical palace located in Jagdalpur, showcasing the architectural heritage of Chhattisgarh."},
            {"name": "Chitrakoot Falls", "description": "Often called the Niagara Falls of India, this waterfall is a major tourist attraction."},
            {"name": "Sirpur Temples", "description": "Ancient Buddhist and Hindu temples dating back to the 5th-8th centuries."},
            {"name": "Kanger Valley National Park", "description": "A national park famous for its limestone caves and diverse wildlife."}
        ]
    },
    "Himachal Pradesh": {
        "title": "HIMACHAL PRADESH",
        "tagline": "The Land of Snow",
        "description": "Discover the rich cultural heritage, magnificent temples, and vibrant traditions of Himachal Pradesh. From the beautiful hill stations to the ancient temples, explore the land of snow.",
        "capital": "Shimla",
        "population": "6.8 Million",
        "best_time": "Apr-Jun, Sep-Nov",
        "language": "Hindi",
        "css_class": "himachal-pradesh",
        "monuments": [
            {"name": "Shimla Ridge", "description": "A large open space in Shimla, offering panoramic views of the surrounding mountains."},
            {"name": "Manali", "description": "A popular hill station known for its scenic beauty, adventure sports, and pleasant climate."},
            {"name": "Dharamshala", "description": "The residence of the Dalai Lama and a center of Tibetan culture in India."},
            {"name": "Kullu Valley", "description": "A beautiful valley known for its temples, festivals, and natural beauty."}
        ]
    },
    "Uttarakhand": {
        "title": "UTTARAKHAND",
        "tagline": "The Land of Gods",
        "description": "Discover the rich cultural heritage, magnificent temples, and vibrant traditions of Uttarakhand. From the sacred Char Dham to the beautiful hill stations, explore the land of gods.",
        "capital": "Dehradun",
        "population": "10 Million",
        "best_time": "Apr-Jun, Sep-Nov",
        "language": "Hindi",
        "css_class": "uttarakhand",
        "monuments": [
            {"name": "Char Dham", "description": "Four sacred Hindu pilgrimage sites: Yamunotri, Gangotri, Kedarnath, and Badrinath."},
            {"name": "Mussoorie", "description": "A popular hill station known as the 'Queen of Hills', offering beautiful views and pleasant climate."},
            {"name": "Nainital", "description": "A beautiful hill station centered around the Naini Lake, known for its scenic beauty."},
            {"name": "Valley of Flowers", "description": "A UNESCO World Heritage Site, famous for its endemic alpine flowers and natural beauty."}
        ]
    },
    "Haryana": {
        "title": "HARYANA",
        "tagline": "The Land of Agriculture",
        "description": "Discover the rich cultural heritage, magnificent temples, and vibrant traditions of Haryana. From the ancient temples to the beautiful countryside, explore the land of agriculture.",
        "capital": "Chandigarh",
        "population": "25 Million",
        "best_time": "Oct-Mar",
        "language": "Hindi",
        "css_class": "haryana",
        "monuments": [
            {"name": "Kurukshetra", "description": "A sacred city where the epic battle of Mahabharata was fought, now a major pilgrimage center."},
            {"name": "Panipat", "description": "A historic city known for three major battles that changed the course of Indian history."},
            {"name": "Sultanpur National Park", "description": "A national park famous for its bird sanctuary and natural beauty."},
            {"name": "Sheikh Chilli's Tomb", "description": "A historical monument in Thanesar, known for its architectural beauty."}
        ]
    },
    "Delhi": {
        "title": "DELHI",
        "tagline": "The Heart of India",
        "description": "Discover the rich cultural heritage, magnificent monuments, and vibrant traditions of Delhi. From the iconic Red Fort to the beautiful Lotus Temple, explore the heart of India.",
        "capital": "New Delhi",
        "population": "16 Million",
        "best_time": "Oct-Mar",
        "language": "Hindi",
        "css_class": "delhi",
        "monuments": [
            {"name": "Red Fort", "description": "A UNESCO World Heritage Site, this historic fort was the main residence of the Mughal emperors."},
            {"name": "India Gate", "description": "A war memorial dedicated to the soldiers who died in World War I, now a symbol of national pride."},
            {"name": "Lotus Temple", "description": "A Bahá'í House of Worship known for its distinctive lotus-like architecture."},
            {"name": "Qutub Minar", "description": "A UNESCO World Heritage Site, this minaret is the tallest brick minaret in the world."}
        ]
    },
    "Goa": {
        "title": "GOA",
        "tagline": "The Pearl of the Orient",
        "description": "Discover the rich cultural heritage, magnificent churches, and vibrant traditions of Goa. From the beautiful beaches to the ancient Portuguese architecture, explore the pearl of the orient.",
        "capital": "Panaji",
        "population": "1.4 Million",
        "best_time": "Nov-Mar",
        "language": "Konkani",
        "css_class": "goa",
        "monuments": [
            {"name": "Basilica of Bom Jesus", "description": "A UNESCO World Heritage Site, this church contains the mortal remains of St. Francis Xavier."},
            {"name": "Se Cathedral", "description": "One of the largest churches in Asia, built in the Portuguese-Gothic architectural style."},
            {"name": "Fort Aguada", "description": "A 17th-century Portuguese fort overlooking the Arabian Sea, now a major tourist attraction."},
            {"name": "Chapora Fort", "description": "A fort built by the Portuguese, famous for its scenic views and historical significance."}
        ]
    },
    "Punjab": {
        "title": "PUNJAB",
        "tagline": "The Land of Five Rivers",
        "description": "Discover the rich cultural heritage, magnificent gurudwaras, and vibrant traditions of Punjab. From the sacred Golden Temple to the beautiful countryside, explore the heart of northern India.",
        "capital": "Chandigarh",
        "population": "27 Million",
        "best_time": "Oct-Mar",
        "language": "Punjabi",
        "css_class": "punjab",
        "monuments": [
            {"name": "Golden Temple", "description": "The holiest shrine of Sikhism, also known as Harmandir Sahib. It's a symbol of human brotherhood and equality."},
            {"name": "Jallianwala Bagh", "description": "A public garden in Amritsar, historically important as the site of the 1919 Jallianwala Bagh massacre."},
            {"name": "Wagah Border", "description": "The international border between India and Pakistan, famous for the daily flag lowering ceremony."},
            {"name": "Anandpur Sahib", "description": "A holy city in Punjab, known for its historical significance in Sikh history and the Khalsa Panth."}
        ]
    },
    "Karnataka": {
        "title": "KARNATAKA",
        "tagline": "One State, Many Worlds",
        "description": "Discover the rich cultural heritage, magnificent temples, and vibrant traditions of Karnataka. From the ancient temples of Hampi to the beautiful beaches of Gokarna, explore one state with many worlds.",
        "capital": "Bangalore",
        "population": "61 Million",
        "best_time": "Oct-Mar",
        "language": "Kannada",
        "css_class": "karnataka",
        "monuments": [
            {"name": "Hampi", "description": "A UNESCO World Heritage Site, this ancient city was the capital of the Vijayanagara Empire."},
            {"name": "Mysore Palace", "description": "The official residence of the Wadiyar dynasty, known for its architectural grandeur and royal heritage."},
            {"name": "Gol Gumbaz", "description": "A mausoleum of Mohammed Adil Shah, known for its massive dome and whispering gallery."},
            {"name": "Belur and Halebidu", "description": "Temple complexes known for their intricate Hoysala architecture and beautiful sculptures."}
        ]
    },
    "Kerala": {
        "title": "KERALA",
        "tagline": "God's Own Country",
        "description": "Discover the rich cultural heritage, magnificent backwaters, and vibrant traditions of Kerala. From the beautiful beaches to the serene hill stations, explore God's own country.",
        "capital": "Thiruvananthapuram",
        "population": "33 Million",
        "best_time": "Oct-Mar",
        "language": "Malayalam",
        "css_class": "kerala",
        "monuments": [
            {"name": "Backwaters", "description": "A network of interconnected canals, rivers, lakes, and inlets that form a unique ecosystem."},
            {"name": "Kovalam Beach", "description": "A beautiful beach destination known for its scenic beauty and water sports."},
            {"name": "Munnar", "description": "A hill station famous for its tea plantations, cool climate, and scenic beauty."},
            {"name": "Padmanabhaswamy Temple", "description": "A famous Hindu temple dedicated to Lord Vishnu, known for its architectural beauty."}
        ]
    },
    "Tamil Nadu": {
        "title": "TAMIL NADU",
        "tagline": "The Land of Temples",
        "description": "Discover the rich cultural heritage, magnificent temples, and vibrant traditions of Tamil Nadu. From the ancient temples of Madurai to the beautiful hill stations, explore the land of temples.",
        "capital": "Chennai",
        "population": "72 Million",
        "best_time": "Oct-Mar",
        "language": "Tamil",
        "css_class": "tamil-nadu",
        "monuments": [
            {"name": "Meenakshi Temple", "description": "A famous Hindu temple dedicated to Meenakshi and Sundareswarar, known for its architectural grandeur."},
            {"name": "Brihadeeswarar Temple", "description": "A UNESCO World Heritage Site, this temple is an outstanding example of Dravidian architecture."},
            {"name": "Mahabalipuram", "description": "A UNESCO World Heritage Site with ancient rock-cut temples and sculptures."},
            {"name": "Ooty", "description": "A popular hill station known for its scenic beauty, tea plantations, and pleasant climate."}
        ]
    },
    "Telangana": {
        "title": "TELANGANA",
        "tagline": "The New State",
        "description": "Discover the rich cultural heritage, magnificent monuments, and vibrant traditions of Telangana. From the historic city of Hyderabad to the beautiful temples, explore the new state with ancient heritage.",
        "capital": "Hyderabad",
        "population": "35 Million",
        "best_time": "Oct-Mar",
        "language": "Telugu",
        "css_class": "telangana",
        "monuments": [
            {"name": "Charminar", "description": "An iconic monument and mosque located in the heart of Hyderabad, built in 1591."},
            {"name": "Golconda Fort", "description": "A historic fort known for its acoustic architecture and diamond trade history."},
            {"name": "Hussain Sagar", "description": "A heart-shaped lake with a monolithic Buddha statue in the center."},
            {"name": "Warangal Fort", "description": "A historic fort known for its architectural beauty and historical significance."}
        ]
    },
    "Andhra Pradesh": {
        "title": "ANDHRA PRADESH",
        "tagline": "The Kohinoor of India",
        "description": "Discover the rich cultural heritage, magnificent temples, and vibrant traditions of Andhra Pradesh. From the ancient temples of Tirupati to the beautiful beaches of Vizag, explore the Kohinoor of India.",
        "capital": "Amaravati",
        "population": "49 Million",
        "best_time": "Oct-Mar",
        "language": "Telugu",
        "css_class": "andhra-pradesh",
        "monuments": [
            {"name": "Tirumala Venkateswara Temple", "description": "A famous Hindu temple dedicated to Lord Venkateswara, one of the richest temples in the world."},
            {"name": "Araku Valley", "description": "A beautiful hill station known for its scenic beauty, coffee plantations, and tribal culture."},
            {"name": "Borra Caves", "description": "Ancient limestone caves known for their stalactite and stalagmite formations."},
            {"name": "Kondapalli Fort", "description": "A historic fort known for its architectural beauty and historical significance."}
        ]
    },
    "Arunachal Pradesh": {
        "title": "ARUNACHAL PRADESH",
        "tagline": "The Land of Dawn-lit Mountains",
        "description": "Discover the rich cultural heritage, magnificent landscapes, and vibrant traditions of Arunachal Pradesh. From the beautiful Tawang to the diverse wildlife, explore the land of dawn-lit mountains.",
        "capital": "Itanagar",
        "population": "1.3 Million",
        "best_time": "Oct-Mar",
        "language": "English",
        "css_class": "arunachal-pradesh",
        "monuments": [
            {"name": "Tawang Monastery", "description": "The largest monastery in India and the second largest in the world, located in Tawang."},
            {"name": "Namdapha National Park", "description": "A national park known for its biodiversity and the only park in India with four big cat species."},
            {"name": "Ziro Valley", "description": "A beautiful valley known for its scenic beauty and the Apatani tribe's unique culture."},
            {"name": "Sela Pass", "description": "A high-altitude mountain pass known for its scenic beauty and frozen lake."}
        ]
    },
    "Manipur": {
        "title": "MANIPUR",
        "tagline": "The Jewel of India",
        "description": "Discover the rich cultural heritage, magnificent landscapes, and vibrant traditions of Manipur. From the beautiful Loktak Lake to the unique culture, explore the jewel of India.",
        "capital": "Imphal",
        "population": "2.8 Million",
        "best_time": "Oct-Mar",
        "language": "Meitei",
        "css_class": "manipur",
        "monuments": [
            {"name": "Loktak Lake", "description": "The largest freshwater lake in Northeast India, famous for its floating phumdis."},
            {"name": "Kangla Fort", "description": "An ancient fort that was the seat of the Manipur kings, now a historical monument."},
            {"name": "Shree Govindajee Temple", "description": "A famous Hindu temple dedicated to Lord Krishna, known for its architectural beauty."},
            {"name": "Keibul Lamjao National Park", "description": "The only floating national park in the world, home to the endangered Sangai deer."}
        ]
    },
    "Mizoram": {
        "title": "MIZORAM",
        "tagline": "The Land of the Hill People",
        "description": "Discover the rich cultural heritage, magnificent landscapes, and vibrant traditions of Mizoram. From the beautiful hills to the unique culture, explore the land of the hill people.",
        "capital": "Aizawl",
        "population": "1.1 Million",
        "best_time": "Oct-Mar",
        "language": "Mizo",
        "css_class": "mizoram",
        "monuments": [
            {"name": "Phawngpui", "description": "The highest peak in Mizoram, known for its scenic beauty and diverse flora and fauna."},
            {"name": "Solomon's Temple", "description": "A beautiful temple built by Dr. L.B. Sailo, known for its unique architecture."},
            {"name": "Tam Dil", "description": "A beautiful lake surrounded by lush green forests, perfect for nature lovers."},
            {"name": "Dampa Tiger Reserve", "description": "A wildlife sanctuary known for its biodiversity and conservation efforts."}
        ]
    },
    "Nagaland": {
        "title": "NAGALAND",
        "tagline": "The Land of Festivals",
        "description": "Discover the rich cultural heritage, magnificent landscapes, and vibrant traditions of Nagaland. From the beautiful hills to the unique tribal culture, explore the land of festivals.",
        "capital": "Kohima",
        "population": "2.2 Million",
        "best_time": "Oct-Mar",
        "language": "English",
        "css_class": "nagaland",
        "monuments": [
            {"name": "Kohima War Cemetery", "description": "A war cemetery dedicated to the soldiers who died in the Battle of Kohima during World War II."},
            {"name": "Dzukou Valley", "description": "A beautiful valley known for its scenic beauty and seasonal flowers."},
            {"name": "Naga Heritage Village", "description": "A cultural village showcasing the traditional lifestyle and architecture of Naga tribes."},
            {"name": "Intanki Wildlife Sanctuary", "description": "A wildlife sanctuary known for its biodiversity and conservation efforts."}
        ]
    },
    "Tripura": {
        "title": "TRIPURA",
        "tagline": "The Land of Rich Heritage",
        "description": "Discover the rich cultural heritage, magnificent palaces, and vibrant traditions of Tripura. From the beautiful Ujjayanta Palace to the unique culture, explore the land of rich heritage.",
        "capital": "Agartala",
        "population": "3.6 Million",
        "best_time": "Oct-Mar",
        "language": "Bengali",
        "css_class": "tripura",
        "monuments": [
            {"name": "Ujjayanta Palace", "description": "A beautiful palace that served as the royal residence, now a museum showcasing Tripura's heritage."},
            {"name": "Neermahal", "description": "A water palace built in the middle of Rudrasagar Lake, known for its architectural beauty."},
            {"name": "Tripura Sundari Temple", "description": "A famous Hindu temple dedicated to Goddess Tripura Sundari, one of the 51 Shakti Peethas."},
            {"name": "Unakoti", "description": "An archaeological site with massive rock-cut sculptures dating back to the 7th-9th centuries."}
        ]
    },
    "Meghalaya": {
        "title": "MEGHALAYA",
        "tagline": "The Abode of Clouds",
        "description": "Discover the rich cultural heritage, magnificent landscapes, and vibrant traditions of Meghalaya. From the beautiful Cherrapunji to the unique Living Root Bridges, explore the abode of clouds.",
        "capital": "Shillong",
        "population": "2.9 Million",
        "best_time": "Mar-Jun, Sep-Nov",
        "language": "Khasi",
        "css_class": "meghalaya",
        "monuments": [
            {"name": "Cherrapunji", "description": "One of the wettest places on Earth, famous for its lush green landscapes and beautiful waterfalls."},
            {"name": "Living Root Bridges", "description": "Unique bridges made from living tree roots, an engineering marvel of nature."},
            {"name": "Elephant Falls", "description": "A beautiful three-tiered waterfall near Shillong, surrounded by lush greenery."},
            {"name": "Mawsmai Cave", "description": "A limestone cave with beautiful formations, perfect for adventure enthusiasts."}
        ]
    },
    "Sikkim": {
        "title": "SIKKIM",
        "tagline": "The Land of Mystic Splendor",
        "description": "Discover the rich cultural heritage, magnificent monasteries, and vibrant traditions of Sikkim. From the beautiful Gangtok to the serene lakes, explore the land of mystic splendor.",
        "capital": "Gangtok",
        "population": "610,000",
        "best_time": "Mar-Jun, Sep-Nov",
        "language": "Nepali",
        "css_class": "sikkim",
        "monuments": [
            {"name": "Rumtek Monastery", "description": "The largest monastery in Sikkim and a center of Tibetan Buddhism, known for its architectural beauty."},
            {"name": "Tsomgo Lake", "description": "A beautiful glacial lake surrounded by snow-capped mountains, sacred to both Hindus and Buddhists."},
            {"name": "Nathula Pass", "description": "A mountain pass on the Indo-China border, known for its scenic beauty and historical significance."},
            {"name": "Yuksom", "description": "The first capital of Sikkim, known for its historical significance and natural beauty."}
        ]
    }
}

def generate_state_html(state_name, state_data):

    monuments_html = ""
    for monument in state_data["monuments"]:
        monuments_html += f'''
            <div class="monument-card">
                <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400" alt="{monument['name']}">
                <div class="monument-info">
                    <h3>{monument['name']}</h3>
                    <p>{monument['description']}</p>
                </div>
            </div>'''
    
    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{state_name} - India Heritage & Culture</title>
    <link href="../../css/style_new.css" rel="stylesheet" />
    <link href="../../css/states-unified.css" rel="stylesheet" />
    <link href="../../css/map-style.css" rel="stylesheet" type="text/css" />
    <script src="../../js/jquery.min.js"></script>
    <script src="../../js/search-functionality.js"></script>
    <script src="https://kit.fontawesome.com/49f73a6ecc.js" crossorigin="anonymous"></script>
</head>
<body class="{state_data['css_class']}">
    <header class="header">
        <nav class="navbar">
            <img class="logo" src="https://res.cloudinary.com/dnyuxgr9i/image/upload/v1759345353/logo1_hdzyyx.png" alt="logo" />
            <button class="mobile-menu-toggle" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul class="nav-links">
                <li><a href="../../index.html">Home</a></li>
                <li><a href="../../explore.html">Explore</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Community</a></li>
                <li><a href="../../contact.html">Contact us</a></li>
                <li><a href="../../login.html">Login</a></li>
            </ul>
        </nav>
    </header>

    <main class="main-content">
        <div class="breadcrumb">
            <a href="../../index.html">Home</a> > 
            <a href="../../explore.html">Explore</a> > <span>{state_name}</span>
        </div>

        <div class="state-hero">
            <div class="state-hero-content">
                <h1>{state_data['title']}</h1>
                <p class="tagline">{state_data['tagline']}</p>
                <p class="description">
                    {state_data['description']}
                </p>
            </div>
            
            <div class="key-facts">
                <h3>Key Facts</h3>
                <ul>
                    <li><strong>Capital:</strong> {state_data['capital']}</li>
                    <li><strong>Population:</strong> {state_data['population']}</li>
                    <li><strong>Best Time:</strong> {state_data['best_time']}</li>
                    <li><strong>Language:</strong> {state_data['language']}</li>
                </ul>
            </div>
        </div>

        <div class="content-grid">
            <div class="introduction-section fade-in">
                <h2>Introduction</h2>
                <p>
                    {state_name} is a state rich in history, culture, and natural beauty. Known for its magnificent monuments, 
                    vibrant traditions, and diverse landscapes, {state_name} offers a perfect blend of heritage and modernity. 
                    From ancient temples to beautiful natural attractions, the state is a treasure trove of cultural heritage 
                    and offers visitors an incredible variety of experiences.
                </p>
            </div>

            <div class="digital-monument fade-in">
                <h2>Digital Monument: {state_data['monuments'][0]['name']}</h2>
                <div class="monument-3d">
                    <button class="interact-button">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="explore-culture">
            <h2>Explore Deep Culture</h2>
            <div class="culture-cards">
                <div class="culture-card">
                    <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400" alt="Arts & Crafts">
                    <div class="culture-card-content">
                        <h3>Arts & Crafts</h3>
                        <p>Discover traditional handicrafts and artistic heritage</p>
                    </div>
                </div>
                <div class="culture-card">
                    <img src="https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400" alt="Cuisine">
                    <div class="culture-card-content">
                        <h3>Cuisine</h3>
                        <p>Experience the authentic flavors of {state_name}</p>
                    </div>
                </div>
                <div class="culture-card">
                    <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400" alt="Festivals & Traditions">
                    <div class="culture-card-content">
                        <h3>Festivals & Traditions</h3>
                        <p>Celebrate the vibrant festivals and cultural traditions</p>
                    </div>
                </div>
                <div class="culture-card">
                    <img src="https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400" alt="Music & Dance">
                    <div class="culture-card-content">
                        <h3>Music & Dance</h3>
                        <p>Immerse in classical music and traditional dance forms</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="search-section">
            <h2>Search Monuments & Places in {state_name}</h2>
            <div class="search-box">
                <form>
                    <input type="text" name="search" id="stateSearch" placeholder="Search for monuments, places, or cities in {state_name}" />
                    <button type="submit">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
            </div>
        </div>

        <div class="monuments-grid">
            {monuments_html}
        </div>

        <div class="text-center">
            <a href="../../explore.html" class="cta-button">
                Test Your Knowledge!
            </a>
        </div>

        <div class="text-center">
            <a href="../../explore.html" class="back-button">
                <i class="fa-solid fa-arrow-left"></i> Back to All States
            </a>
        </div>
    </main>

    <script src="../../js/navigation.js"></script>
</body>
</html>'''
    
    return html_content

def main():
    """Generate all state HTML files."""
    states_dir = "India Heritage/sih_2025/states/New folder"
    
    os.makedirs(states_dir, exist_ok=True)
    
    for state_name, state_data in states_data.items():
        if state_name == "West Bengal":
            filename = "westbengal.html"
        elif state_name == "Uttar Pradesh":
            filename = "UttarPradesh.html"
        elif state_name == "Uttarakhand":
            filename = "Uttarakhand.html"
        elif state_name == "Himachal Pradesh":
            filename = "HimachalPradesh.html"
        elif state_name == "Madhya Pradesh":
            filename = "MadhyaPradesh.html"
        elif state_name == "Arunachal Pradesh":
            filename = "ArunachalPradesh.html"
        elif state_name == "Jharkhand":
            filename = "Jharkhand.html"
        elif state_name == "Chattisgarh":
            filename = "chattisgarh.html"
        elif state_name == "Delhi":
            filename = "delhi.html"
        elif state_name == "Maharastra":
            filename = "Maharastra.html"
        elif state_name == "Andhra Pradesh":
            filename = "AndhraPradesh.html"
        elif state_name == "Tamil Nadu":
            filename = "TamilNadu.html"
        else:
            filename = state_name.lower().replace(" ", "").replace("-", "") + ".html"
        
        filepath = os.path.join(states_dir, filename)
        
        html_content = generate_state_html(state_name, state_data)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"Generated {filename} for {state_name}")

if __name__ == "__main__":
    main()

