package com.reservation.system.utility;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.reservation.system.entity.Role;
import com.reservation.system.entity.User;
import com.reservation.system.repository.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class AuthenticationUtility implements Serializable 
{

	 private static final long serialVersionUID = 234234523523L;

     public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;
     
	
//	 @Value("${jwt.secret}")
	 private String secretKey ="secretKey123";
	 
	 @Autowired
		private UserRepository userRepository;

	 //retrieve username from jwt token
	 public String getUsernameFromToken(String token) {
		 return getClaimFromToken(token, Claims::getSubject);
	 }
	 
	 //retrieve expiration date from jwt token
	 public Date getExpirationDateFromToken(String token) {
		 return getClaimFromToken(token, Claims::getExpiration);
	 }
	 
	 
	 public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		 final Claims claims = getAllClaimsFromToken(token);
		 return claimsResolver.apply(claims);
	 }
	 
	 
	 //for retrieving any information from token we will need the secret key
	 private Claims getAllClaimsFromToken(String token) {
		 return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
	 }
	 
	 
	 //check if the token has expired
	 private Boolean isTokenExpired(String token) {
		 final Date expiration = getExpirationDateFromToken(token);
		 return expiration.before(new Date());
	 }
	 
    //generate token for user
    public String generateToken(UserDetails userDetails) {
    	Map<String, Object> claims = new HashMap<>();
    	 Set<String> Userroles = new HashSet<>();
         User user = userRepository.findByEmail(userDetails.getUsername());
         for(Role role:user.getRole()){
             Userroles.add(role.getName());
         }
         claims.put("Roles",Userroles.toArray());
         claims.put("key",secretKey);
        return doGenerateToken(claims, userDetails.getUsername());
    }

    //while creating the token -
    //1. Define  claims of the token, like Issuer, Expiration, Subject, and the ID
    //2. Sign the JWT using the HS512 algorithm and secret key.
    private String doGenerateToken(Map<String, Object> claims, String subject) 
    {
        return Jwts.builder().setClaims(claims).setSubject(subject)
        		.setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, secretKey).compact();
    }


    //validate token
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
	
	
	
}
