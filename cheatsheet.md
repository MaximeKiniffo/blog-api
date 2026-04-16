# 🚀 NestJS Cheat Sheet

---

## ⌨️ CLI

```bash
nest g mo <name>              # module
nest g co <name>              # controller
nest g s  <name>              # service
nest g cl <name> --no-spec    # class (DTO, entity...)
```

---

## 🎮 Décorateurs Controller

```typescript
@Controller('route')

@Get()    @Post()    @Put()    @Patch()    @Delete()
@Get(':id')

@Param('id')        // paramètre URL
@Body()             // corps de la requête
@Query('param')     // query string ?param=...
@HttpCode(201)
```

---

## ✅ class-validator

### Strings
```typescript
@IsString()    @IsEmail()    @IsUrl()
@MinLength(3)  @MaxLength(100)
@IsNotEmpty()
@Matches(/regex/)
```

### Numbers
```typescript
@IsNumber()    @IsInt()
@Min(0)        @Max(100)
```

### Booleans
```typescript
@IsBoolean()
```

### Divers
```typescript
@IsOptional()
@IsEnum(MonEnum)
@IsArray()
@IsString({ each: true })   // valide chaque élément
@ValidateNested()
```

---

## 🔧 ValidationPipe global

```typescript
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,            // supprime champs inconnus
  forbidNonWhitelisted: true, // erreur si champs inconnus
  transform: true,            // convertit les types auto
}));
```

---

## 🗄️ TypeORM — Entité

```typescript
@Entity('table_name')
@PrimaryGeneratedColumn()
@Column()
@Column({ type: 'text', nullable: true, default: false })
@Column('simple-array')
@CreateDateColumn()
@UpdateDateColumn()
```

---

## 🔗 TypeORM — Relations

```typescript
// ManyToOne (côté enfant)
@ManyToOne(() => Author, (author) => author.articles)
@JoinColumn({ name: 'author_id' })
author: Author;

// OneToMany (côté parent)
@OneToMany(() => Article, (article) => article.author)
articles: Article[];

// ManyToMany
@ManyToMany(() => Tag, (tag) => tag.articles)
@JoinTable()
tags: Tag[];
```

---

## 📦 TypeORM — Repository

```typescript
repository.find({ where: {}, relations: ['author'] })
repository.findOne({ where: { id } })
repository.create(data)
repository.save(entity)
repository.update(id, data)
repository.delete(id)
```

---

## ⚠️ Exceptions HTTP

```typescript
throw new NotFoundException('message')
throw new BadRequestException('message')
throw new UnauthorizedException('message')
throw new ForbiddenException('message')
throw new ConflictException('message')
```

---

## 🛡️ Filtre d'exception global

```typescript
app.useGlobalFilters(new HttpExceptionFilter());
```
