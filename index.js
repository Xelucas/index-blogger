var postTitle=[],postUrl=[],postDate=[],postLabels=[],postBaru=[],tocLoaded=false,postFilter="",numberfeed=0;
function reverse(s) {
  return s.split('/').reverse().join('/');
}
function loadtoc(a){
	if("entry" in a.feed){
		var d=a.feed.entry.length,c="",n,e,m,j,f;
		numberfeed=d;
		ii=0;
		for(var h=0;h<d;h++){
			n=a.feed.entry[h];
			e=n.title.$t;
			m=n.published.$t.substring(0,10);
			for(var g=0;g<n.link.length;g++){
				if(n.link[g].rel=="alternate"){
					j=n.link[g].href;
					break;
				}
			}
			if(conf.sortBy != 'orderlabel'){
				postTitle[ii]=e;
			}
			if("category" in n){
				for(var g=0;g<n.category.length;g++){
					c=n.category[g].term;
					f=c.lastIndexOf(";");
					if(f!=-1){
						c=c.substring(0,f);
					}
					postLabels[ii]=c;
					if(conf.sortBy == 'orderlabel'){
						postTitle[ii]=e;
					}
					postDate[ii]=m;
					postUrl[ii]=j;
					if(h<parseInt(conf.lastPost,10)){
						postBaru[ii]=true;
					}else{
						postBaru[ii]=false;
					}
					ii=ii+1;
				}
			}
		}
	}
	sortlabel();
	tocLoaded=true;
	displayToc();
}
function c(e,g){
	var f=postTitle[e];
	postTitle[e]=postTitle[g];
	postTitle[g]=f;
	f=postDate[e];
	postDate[e]=postDate[g];
	postDate[g]=f;
	f=postUrl[e];
	postUrl[e]=postUrl[g];
	postUrl[g]=f;
	f=postLabels[e];
	postLabels[e]=postLabels[g];
	postLabels[g]=f;
	f=postBaru[e];
	postBaru[e]=postBaru[g];
	postBaru[g]=f;
}
function e(f,h){
	var g=postTitle[f];
	postTitle[f]=postTitle[h];
	postTitle[h]=g;
	g=postDate[f];
	postDate[f]=postDate[h];
	postDate[h]=g;
	g=postUrl[f];
	postUrl[f]=postUrl[h];
	postUrl[h]=g;
	g=postLabels[f];
	postLabels[f]=postLabels[h];
	postLabels[h]=g;
	g=postBaru[f];
	postBaru[f]=postBaru[h];
	postBaru[h]=g;
}
function sortPosts(d){
	for(var b=0;b<postTitle.length-1;b++){
		for(var a=b+1;a<postTitle.length;a++){
			if(d=="titleasc"){
				if(postTitle[b]>postTitle[a]){c(b,a);}
			}
			if(d=="titledesc"){
				if(postTitle[b]<postTitle[a]){c(b,a);}
			}
			if(d=="dateoldest"){
				if(postDate[b]>postDate[a]){c(b,a);}
			}
			if(d=="datenewest"){
				if(postDate[b]<postDate[a]){c(b,a);}
			}
			if(d=="orderlabel"){
				if(postLabels[b]>postLabels[a]){c(b,a);}
			}
		}
	}
}
function sortPosts2(d,c){
	for(var b=d;b<c-1;b++){
		for(var a=b+1;a<c;a++){
			if(postTitle[b]>postTitle[a]){
				e(b,a);
			}
		}
	}
}
function sortlabel(){
	lastPost=10;
	sortPosts(conf.sortBy);
	var a=0,b=0,temp,aux,firsti;
	while(b<postTitle.length){
		temp=(conf.sortBy == 'orderlabel')?postLabels[b]:postTitle[b];
		aux=(conf.sortBy == 'orderlabel')?postLabels:postTitle;
		firsti=a;
		do{a=a+1}
		while(aux[a]==temp);
		b=a;
		sortPosts2(firsti,a);
		if(b>postTitle.length){break}
	}
}
function displayToc(){
	var a=0,b=0,tab='',temp,aux,firsti,dv=document.getElementById('all-post');
	var p, h, o, i, s, n;
	
	if(conf.newtab){
		tab = '_blank';
	}
	dv.innerHTML = '';

	while(b<postTitle.length){
		temp=(conf.sortBy == 'orderlabel')?postLabels[b]:postTitle[b];
		
		if(conf.sortBy == 'orderlabel'){
			p = document.createElement('p'),
			h = document.createElement('a');
			p.id = 'id-paragraph'+a;
			h.setAttribute('href', '../search/label/'+temp);
			h.setAttribute('target', tab);
			h.appendChild(document.createTextNode(temp));
			dv.appendChild(p);
			document.getElementById('id-paragraph'+a).appendChild(h);
		}
		o = document.createElement('ol');
		dv.appendChild(o);
		
		aux=(conf.sortBy == 'orderlabel')?postLabels:postTitle;
		firsti=a;
		do{
			if(postTitle[a]){
				l = document.createElement('li');
				h = document.createElement('a');
				h.id = 'id-title';
				h.setAttribute('href', postUrl[a]);
				h.setAttribute('target', tab);
				h.appendChild(document.createTextNode(postTitle[a]));
				o.appendChild(l);
				l.appendChild(h);
				if(conf.date){
					s = document.createElement('span');
					s.appendChild(document.createTextNode(reverse(postDate[a].replace(/-/g,"/"))));
					l.appendChild(s);
				}
				if(postBaru[a]==true){
					n = document.createElement('strong');
					n.appendChild(document.createTextNode(conf.newPost));
					l.appendChild(n);
				}
			}
			a=a+1;
		} while(aux[a]==temp);
		b=a;
		sortPosts2(firsti,a);
		if(b>postTitle.length){break;}
	}
}