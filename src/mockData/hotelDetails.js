import img1 from '../image/Rectangle 26.png';
import img2 from '../image/Rectangle 27.png';
import img3 from '../image/Rectangle 28.png';

const hotelDetails = [
	{
		title: "Light bright airy stylish apt & safe peaceful stay",
		specification: {
			guest: 4,
			rooms: 2,
			beds: 2,
			bathrooms: 2,
		},
		features: ["Wif Air conditioning Kitchen", "Cancellation flexibility available"],
		ratings: 4.9,
		totalRating: 20,
		price: 34,
		coordinates: { lat: 21.4171963, long: 91.977232 },
		imgUrl: `${img1}`,
	},
	{
		title: "Apartment in Lost Panorama",
		specification: {
			guest: 4,
			rooms: 2,
			beds: 2,
			bathrooms: 2,
		},
		features: ["Wif Air conditioning Kitchen", "Cancellation flexibility available"],
		ratings: 4.5,
		totalRating: 15,
		price: 52,
		coordinates: { lat: 21.4172171, long: 91.9772095 },
		imgUrl: `${img2}`,
	},
	{
		title: "AR Lounge & Pool (r&r + b&b)",
		specification: {
			guest: 4,
			rooms: 2,
			beds: 2,
			bathrooms: 2,
		},
		features: ["Wif Air conditioning Kitchen", "Cancellation flexibility available"],
		ratings: 4.9,
		totalRating: 25,
		price: 44,
		coordinates: { lat: 21.4172171, long: 91.9772095 },
		imgUrl: `${img3}`,
	},
];

export default hotelDetails;
