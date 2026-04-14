5. Le CLI : ton meilleur ami
Le CLI NestJS génère automatiquement les fichiers pour toi :
```bash
nest generate module    users       # ou: nest g mo users
nest generate controller users      # ou: nest g co users
nest generate service   users       # ou: nest g s users
```

// Strings
@IsString()
@MinLength(3)
@MaxLength(100)
@IsEmail()
@IsUrl()
@Matches(/^[a-z]+$/, { message: 'Lettres minuscules uniquement' })

// Numbers
@IsNumber()
@IsInt()
@Min(0)
@Max(100)

// Booleans
@IsBoolean()

// Divers
@IsOptional()    // rend le champ optionnel
@IsNotEmpty()    // interdit les strings vides ""
@IsEnum(MonEnum) // valide par rapport à un enum TypeScript
@IsArray()
@ValidateNested() // valide un objet imbriqué