<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PuzzleGameController extends AbstractController
{
    #[Route('/puzzle/game', name: 'puzzle_game')]
    public function index(): Response
    {
        return $this->render('puzzle_game/index.html.twig', [
        ]);
    }

    #[Route('/puzzle/gameOne', name:'puzzle_gameOne')]
    public function gamePuzzle():Response
    {
        return $this->render('gameOne/game_puzzle.html.twig',[]);
    }
}
