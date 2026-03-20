import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
//import { UpdateProduitDto } from './dto/update-produit.dto';
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
      return produitTrouvé;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  /*update(id: number, updateProduitDto: UpdateProduitDto) {
    return `This action updates a #${id} produit`;
  }*/

  remove(id: number) {
    return `This action removes a #${id} produit`;
  }
}
