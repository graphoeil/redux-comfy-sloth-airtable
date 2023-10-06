/* Il faut installer le client netlify via node :
npm i netlify-cli -D
puis ajouter dans package.json dans les scripts :
"netlify": "netlify dev",
"dev": "netlify dev" 
le lancement se fait via npm run build*/

/* Le dossier functions contient les fonctions spécifiques à netlify,
nous devons le déclarer dans le fichier netlify.toml */

// Lancement du script en nous rendant sur http://localhost:8888
// http://localhost:8888/.netlify/functions/hello

// Format de déclaration d'une fonction (node)
// Cette fonction retourne une promesse
const items = [
	{ id:1, name:'Cahouet' },
	{ id:2, name:'Jambon' },
	{ id:3, name:'Pataud' },
	{ id:4, name:'Mushi' }
];
exports.handler = async function(event, context){
	// Nous retourons un objet
	return {
		// 200 => réponse ok
		statusCode:200,
		body:JSON.stringify(items)
	};
};