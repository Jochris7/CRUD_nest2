import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produit } from './entities/produit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProduitsService {
  constructor(
    @InjectRepository(Produit) private produitRepository: Repository<Produit>,
  ) {}

  async create(createProduitDto: CreateProduitDto): Promise<Produit> {
    try {
      const produit = this.produitRepository.create(createProduitDto);
      return await this.produitRepository.save(produit);
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === '23505') {
        throw new ConflictException();
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Produit[]> {
    try {
      return await this.produitRepository.find();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    try {
      const produitTrouvé = await this.produitRepository.findOneBy({ id });
      if (!produitTrouvé) {
        throw new NotFoundException();
      }
      console.log(produitTrouvé);
      return { data: produitTrouvé };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateProduitDto: UpdateProduitDto) {
    try {
      const product = await this.produitRepository.findOneBy({ id });
      if (!product) {
        throw new HttpException('Produits non trouvé', HttpStatus.NOT_FOUND);
      }
      const updateProduct = Object.assign(product, updateProduitDto);
      return this.produitRepository.save(updateProduct);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('');
    }
  }

  async remove(id: string) {
    try {
      const productSelected = await this.produitRepository.findOneBy({ id });
      if (!productSelected) {
        throw new NotFoundException();
      }
      return await this.produitRepository.remove(productSelected);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
