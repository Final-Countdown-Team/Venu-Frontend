

const removeAtSymbol = (userMediaTag) => {
    return userMediaTag.replace('@', '');
    
}

const socialMediaURL = (userMediaTag, socialMedia) => {
    return socialMedia + removeAtSymbol(userMediaTag);
}

console.log(socialMediaURL('@neetu', 'https://twitter.com/'));

export default socialMediaURL;



